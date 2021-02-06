export default function Card({ children, title, icon, status }) {
  return (
    <div className="border rounded border-gray-200 p-2 text-center">
      <div className="text-sm py-2 font-bold flex flex-row items-center justify-center">
        <img src={icon} className="h-4 px-2" />
        <span>{title}</span>
        {status ? (
          <div>
            {status === "warning" ? (
              <div className="ml-2 rounded-full w-2 h-2 bg-red-500"></div>
            ) : status === "info" ? (
              <div className="ml-2 rounded-full w-2 h-2 bg-wellow-500"></div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="text-5xl font-thin">{children}</div>
    </div>
  );
}
