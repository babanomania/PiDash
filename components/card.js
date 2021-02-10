export default function Card({ children, title, icon, status }) {
  return (
    <div className="border rounded border-gray-200 p-2 text-center dark:bg-gray-800 dark:border-gray-900 dark:text-white dark:shadow-inner">
      <div className="text-sm py-2 font-bold flex flex-row items-center justify-center">
        {icon}
        <span>{title}</span>
        {status ? (
          <div>
            {status === "warning" ? (
              <div className="ml-2 rounded-full w-2 h-2 bg-red-500"></div>
            ) : status === "info" ? (
              <div className="ml-2 rounded-full w-2 h-2 bg-yellow-500"></div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="text-5xl font-thin dark:text-gray-400">{children}</div>
    </div>
  );
}
