import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import { icon_moon, icon_sun } from "./icons";

const storage_key = "pi-dash:dark-mode";

export default function Layout({ children, active }) {
  const [isDarkMode, setDarkMode] = useState();

  useEffect(() => {
    if (isDarkMode === undefined)
      setDarkMode(window.localStorage.getItem(storage_key) ? true : false);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : null}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Head>
          <title>Rasberry Pi | {active}</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <main>
          <div className="flex flex-row space-x-2 items-center shadow text-white bg-red-600 dark:bg-red-900">
            <div className="flex flex-row items-center justify-between w-full pr-4">
              <div className="flex flex-row items-center">
                <img src="pi-logo.svg" className="h-12 px-3 md:pl-5" />
                <div
                  className={
                    active === "Dashboard"
                      ? "bg-white dark:bg-red-700 bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 cursor-pointer"
                      : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 cursor-pointer"
                  }
                >
                  <Link href="/">Dashboard</Link>
                </div>
                <div
                  className={
                    active === "Applications"
                      ? "bg-white dark:bg-red-700 bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 m-2 cursor-pointer"
                      : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 m-2 cursor-pointer"
                  }
                >
                  <Link href="/apps">Applications</Link>
                </div>
                <div
                  className={
                    active === "docker"
                      ? "bg-white dark:bg-red-700 bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 m-2 cursor-pointer"
                      : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 m-2 cursor-pointer"
                  }
                >
                  <Link href="/docker">Docker</Link>
                </div>
              </div>
              <div>
                {isDarkMode ? (
                  <div
                    className="cursor-pointer select-none p-1 rounded-full pl-6 shadow-inner bg-red-800 dark:bg-red-700"
                    onClick={(e) => {
                      localStorage.setItem(storage_key, false);
                      setDarkMode(false);
                    }}
                  >
                    {icon_moon}
                  </div>
                ) : (
                  <div
                    className="cursor-pointer select-none p-1 rounded-full pr-6 shadow-inner bg-red-800 dark:bg-red-700"
                    onClick={(e) => {
                      localStorage.setItem(storage_key, true);
                      setDarkMode(true);
                    }}
                  >
                    {icon_sun}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container mx-auto ">{children}</div>
        </main>

        <footer className="fixed bottom-0 w-full text-center text-xs bg-gray-100 dark:bg-gray-900 border-t-2 py-4 border-gray-200 dark:border-gray-900 dark:text-white ">
          Powered by Rasberry PI
        </footer>
      </div>
    </div>
  );
}
