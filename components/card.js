export default function Card({ children, title, icon }) {
  return (
    <div className="border rounded border-gray-200 p-2 text-center">
      <div className="text-sm py-2 font-bold flex flex-row items-center justify-center">
        <img src={icon} className="h-4 px-2" />
        <span> {title}</span>
      </div>
      <div className="text-5xl font-thin">{children}</div>
    </div>
  );
}
