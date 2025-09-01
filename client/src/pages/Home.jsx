import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/link.png";

const navigation = [
  { name: "Contact Us", path: "#" },
  { name: "Learn How it Works", path: "#" },
];

export default function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
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

         
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
            <button
               onClick={() => navigate('/login')}
              className="rounded-md px-4 py-2 text-sm font-semibold text-white hover:text-indigo-400 transition"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
            >
              Sign up
            </button>
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/50" />{" "}
          
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
                      href={item.href}
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

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30  opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h5 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              One Link Endless Possibilities.
            </h5>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Combine multiple URLs into a single SmartLink with rich previews.
              Share cleaner, smarter, and more professional links anywhere.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate('/signup')}
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:text-indigo-400 transition cursor-pointer"
              >
                Get started
              </button>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}
