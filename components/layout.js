import Head from "next/head";

export default function Layout({ children, active }) {
  return (
    <div>
      <Head>
        <title>Rasberry Pi | {active}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-row p-2 space-x-2 items-center shadow text-white bg-red-600">
          <img src="pi-logo.svg" className="h-9 px-5" />
          <div
            className={
              active === "Dashboard"
                ? "bg-white bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 cursor-pointer"
                : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 cursor-pointer"
            }
          >
            Dashboard
          </div>
          <div
            className={
              active === "Applications"
                ? "bg-white bg-opacity-50 hover:bg-opacity-30 hover:shadow-inner rounded p-2 cursor-pointer"
                : "hover:bg-white hover:bg-opacity-50 rounded hover:shadow-inner p-2 cursor-pointer"
            }
          >
            Applications
          </div>
        </div>

        <div className="container mx-auto">{children}</div>
      </main>

      <footer className="fixed bottom-0 w-full text-center bg-gray-100 border-t-2 py-4 border-gray-200">
        Powered by Rasberry PI
      </footer>
    </div>
  );
}
