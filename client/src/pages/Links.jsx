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

export default function AllLinksPage() {
  const { checkAuth, authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getAllLinks, links } = useAnalytics(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        await getAllLinks();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    checkAuth(); 
  }, []);

  const handleLinkClick = (linkId) => {
    navigate(`/analytics/${linkId}`);
  };

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
  };

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
              <span className="ml-2 text-xl font-bold tracking-wide">SmartLink</span>
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
                onClick={() => navigate("/input")}
                className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                Dashboard
              </button>
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
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
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
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-left text-white hover:text-indigo-400 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/")}
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">All Your Links</h1>
          <p className="text-gray-400 text-lg">Manage and analyze all your shortened links</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
          </div>
        )}

        {/* Links List */}
        {!loading && links && links.length > 0 && (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link._id}
                onClick={() => handleLinkClick(link._id)}
                className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:bg-gray-800/60 transition group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Link info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <h3 className="font-mono text-indigo-400 text-lg font-semibold">
                        {link.shortened_url}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(`${window.location.origin}/${link.shortUrl || link.short_url}`);
                        }}
                        className="p-1 text-gray-400 hover:text-indigo-400 transition"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 truncate pr-4">
                      {link.fullUrls ? link.fullUrls.join(", ") : link.full_url ? link.full_url.join(", ") : "No URLs"}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Right side - Arrow */}
                  <div className="flex items-center text-gray-400 group-hover:text-indigo-400 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!links || links.length === 0) && (
          <div className="text-center py-12">
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg p-8 mx-auto max-w-md">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No Links Yet</h3>
              <p className="text-gray-400 mb-4">You haven't created any short links yet.</p>
              <button
                onClick={() => navigate("/input")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-medium"
              >
                Create Your First Link
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}