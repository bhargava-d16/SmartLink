import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/link.png";
import { useAuth } from "../store/authStore";
import { useAnalytics } from "../store/analyticsStore";

const navigation = [
  { name: "Contact Us", path: "#" },
  { name: "Learn How it Works", path: "#" },
];

export default function AnalyticsPage() {
  const { checkAuth, authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { getAnalytics, analytics, getAllLinks, links } = useAnalytics();

  const {linkId}=useParams()
  console.log(linkId)
  useEffect(() => {
    checkAuth();
  }, []);


  useEffect(() => {
    if (authUser === false) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (authUser) {
      const fetchData = async () => {
        try {
          setLoading(true);
          await getAnalytics(linkId);
          await getAllLinks(); 
        } catch (error) {
          console.log("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [authUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }


  if (authUser === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-xl">Checking authentication...</div>
      </div>
    );
  }


  const totalLinks = links?.length || 0;
  const totalClicks = analytics?.totalClicks || 0;
  const lastSeen = analytics?.lastSeen || "Never";
  const clicksOverTime = analytics?.clicksOverTime || [];

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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
            >
              Log Out
            </button>
          </div>
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
              {/* Fixed: Show logout for authenticated users in mobile menu */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="text-left text-white hover:text-indigo-400 transition"
                >
                  Log Out
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
            { title: "Total Links", value: totalLinks.toString() },
            { title: "Total Clicks", value: totalClicks.toLocaleString() },
            {
              title: "Last Seen",
              value: lastSeen
                ? new Date(lastSeen).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "No data",
            },
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
          {clicksOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clicksOverTime}>
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
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <p>No click data available yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
