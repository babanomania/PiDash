import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, active }) {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Rasberry Pi | {active}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-row space-x-2 items-center shadow text-white bg-red-600 dark:bg-red-900">
          <img src="pi-logo.svg" className="h-12 px-5" />
          <div
            className={
              active === "Dashboard"
                ? "bg-white bg-opacity-50 dark:bg-opacity-10 hover:bg-opacity-30 hover:shadow-inner rounded p-2 cursor-pointer"
                : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 cursor-pointer"
            }
          >
            <Link href="/">Dashboard</Link>
          </div>
          <div
            className={
              active === "Applications"
                ? "bg-white bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 m-2 cursor-pointer"
                : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 m-2 cursor-pointer"
            }
          >
            <Link href="/apps">Applications</Link>
          </div>
          <div
            className={
              active === "Containers"
                ? "bg-white bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 m-2 cursor-pointer"
                : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 m-2 cursor-pointer"
            }
          >
            <Link href="/containers">Containers</Link>
          </div>
        </div>

        <div className="container mx-auto ">{children}</div>
      </main>

      <footer className="fixed bottom-0 w-full text-center text-xs bg-gray-100 dark:bg-gray-900 border-t-2 py-4 border-gray-200 dark:border-gray-900 dark:text-white ">
        Powered by Rasberry PI
      </footer>
    </div>
  );
}
