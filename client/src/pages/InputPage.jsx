import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import toast from "react-hot-toast";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/link.png";
import useLinkStore from "../store/LinkStore";
import {useAuth} from "../store/authStore";
const navigation = [
  { name: "Contact Us", path: "#" },
  { name: "Learn How it Works", path: "#" },
];

const InputPage = () => {
  const { shortenUrl, shortUrl, getUrl } = useLinkStore();
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [links, setLinks] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [id, setId] = useState("");

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setLinks((prev) => [...prev, { id: Date.now(), url: linkInput.trim() }]);
    setLinkInput("");
  };

  const handleSubmitLinks = async () => {
    try {
      const urls = links.map((link) => link.url);
      const res = await shortenUrl({ urls });

      if (res?.shortUrl) {
        const shortenedId = res.shortUrl.split("/").pop();
        setId(shortenedId);
        console.log("Extracted ID:", shortenedId);
        setShowResult(true);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to shorten URLs");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  const visitUrl = async () => {
    try {
      await getUrl(id);
      toast.success("Redirecting to original URL...");
    } catch (error) {
      console.error("Error visiting URL:", error);
      window.open(shortUrl, "_blank");
    }
  };

  const handleDeleteLink = (linkId) => {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex items-center lg:flex-1 gap-x-2">
            <a href="#" className="flex items-center -m-1.5 p-1.5">
              <img alt="logo" src={logo} className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">
                SmartLink
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
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

          
          {authUser && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
              <button
                onClick={() => navigate("/analytics")}
                className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                Analytics
              </button>
              <button
                onClick={() => navigate("/")}
                className="cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
              >
                Log Out
              </button>
            </div>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-gray-900 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-indigo-400 transition"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 flex flex-col gap-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg bg-indigo-600 px-3 py-2.5 text-base font-semibold text-white text-center shadow-sm hover:bg-indigo-500 transition"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h5 className="text-5xl font-semibold tracking-tight text-white sm:text-5xl">
            One Link Endless Possibilities.
          </h5>
          <form onSubmit={handleAddLink} className="flex justify-center mt-12">
            <input
              type="text"
              name="url"
              value={linkInput}
              onChange={(e) => {
                const value = e.target.value;
                setLinkInput(value);
              }}
              placeholder="Paste links to aggregate and share it with the world..."
              className="w-full max-w-xl rounded-l-md bg-gray-800 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-r-md transition"
            >
              +
            </button>
          </form>
          {links.length > 0 && !showResult && (
            <button
              onClick={handleSubmitLinks}
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-md transition"
            >
              Submit Links
            </button>
          )}

          {showResult && shortUrl && (
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">
                  Your shortened URL:
                </div>
                <div className="flex items-center justify-between bg-gray-900 rounded-md p-3">
                  <span
                    className="text-blue-400 font-mono text-sm break-all flex-1 mr-3 cursor-pointer hover:text-blue-300 transition"
                    onClick={visitUrl}
                    title="Click to visit the shortened URL"
                  >
                    {shortUrl}
                  </span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={visitUrl}
                      className="cursor-pointer bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      Visit
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ul className="mt-8 space-y-2 max-w-xl mx-auto text-left">
            {links.map((link) => (
              <li
                key={link.id}
                className="bg-gray-900 text-white flex justify-between items-center px-4 py-2 rounded shadow"
              >
                <span className="break-all">{link.url}</span>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="cursor-pointer text-red-500 hover:text-red-700 text-xl font-bold ml-5"
                  aria-label="Delete"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
