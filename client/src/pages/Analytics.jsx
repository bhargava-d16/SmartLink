import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/link.png";
import { useAuth } from "../store/authStore";
import { useAnalytics } from "../store/analyticsStore";

const navigation = [
  { name: "Contact Us", path: "#" },
  { name: "Learn How it Works", path: "#" },
];

const data = [
  { date: "Sep 1", clicks: 30 },
  { date: "Sep 2", clicks: 45 },
  { date: "Sep 3", clicks: 20 },
  { date: "Sep 4", clicks: 60 },
];

export default function AnalyticsPage() {
  const { checkAuth, authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getAnalytics, analytics } = useAnalytics();

  useEffect(() => {
    checkAuth();
  }, []);

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalytics();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-12 backdrop-blur-md bg-black/40 rounded-b-2xl shadow-lg"
        >
          {/* Logo */}
          <div className="flex items-center lg:flex-1 gap-x-2">
            <a href="#" className="flex items-center -m-1.5 p-1.5">
              <img alt="logo" src={logo} className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold tracking-wide">
                SmartLink
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-200 hover:text-indigo-400 rounded-lg transition"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          {authUser && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
              <button
                onClick={handlelogout}
                className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                Log Out
              </button>
            </div>
          )}
        </nav>

        {/* Mobile drawer */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-gray-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <img alt="logo" src={logo} className="h-8 w-auto" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-indigo-400 transition"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 space-y-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="block text-base font-semibold text-white hover:text-indigo-400 transition"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
                <button className="text-left text-white hover:text-indigo-400 transition">
                  Log in
                </button>
                <button className="rounded-lg bg-indigo-600 px-3 py-2.5 text-base font-semibold text-white text-center shadow-sm hover:bg-indigo-500 transition">
                  Sign up
                </button>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Main content */}
      <main className="pt-32 px-6 lg:px-12 space-y-8">
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Links", value: "124" },
            { title: "Total Clicks", value: "5,421" },
            { title: "Last Seen", value: "Sep 11, 18:20" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:bg-gray-800/60 transition"
            >
              <h2 className="text-sm text-gray-400">{item.title}</h2>
              <p className="mt-1 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Clicks Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.clicksOverTime}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#f97316"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Links</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-3 px-4">Short URL</th>
                  <th className="py-3 px-4">Original URL</th>
                  <th className="py-3 px-4">Clicks</th>
                  <th className="py-3 px-4">Last Seen</th>
                  <th className="py-3 px-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                  <td className="py-3 px-4 font-mono text-indigo-400">
                    /x1y2z3
                  </td>
                  <td className="py-3 px-4 truncate max-w-xs">
                    https://google.com
                  </td>
                  <td className="py-3 px-4">120</td>
                  <td className="py-3 px-4">Sep 11, 18:20</td>
                  <td className="py-3 px-4">Sep 1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
