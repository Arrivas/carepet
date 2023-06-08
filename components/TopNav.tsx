import React from "react";
import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full font-Nunito z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/dashboard" className="flex items-center">
          <img
            src="./hero/playground_assets/logo3.png"
            className="h-8 mr-3"
            alt="Carepet Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col  md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block p-4 pl-3 pr-4 text-gray-900"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 pl-3 pr-4 text-gray-900 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 pl-3 pr-4 text-gray-900 ">
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 pl-3 pr-4 text-gray-900 rounded "
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 pl-3 pr-4 text-gray-900 rounded "
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
