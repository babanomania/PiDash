import Card from "./card";

export default function Dashboard(props) {
  const { system, cpu, mem, swap, disk, disksIO, eth0, wlan0 } = props;
  const { onReload, loading } = props;

  const data = [
    {
      title: "CPU Temperature",
      icon: "/icons/fire.svg",
      data: `${cpu.temperature}°C`,
    },
    { title: "CPU Usage", icon: "/icons/chip.svg", data: `${cpu.usage}%` },
    {
      title: "Memory Usage",
      icon: "/icons/view-boards.svg",
      data: `${mem.usage}%`,
      details: `${mem.freeMB} / ${mem.totalMB} MB`,
    },
    {
      title: "SWAP Usage",
      icon: "/icons/switch-horizontal.svg",
      data: `${swap.usage}%`,
      details: `${swap.freeMB} / ${swap.totalMB} MB`,
    },
    {
      title: "Disk Usage",
      icon: "/icons/credit-card.svg",
      data: `${disk.usedPercent}%`,
      details: `${disk.usedGB} / ${disk.totalGB} GB`,
    },
    {
      title: "DisK IO",
      icon: "/icons/switch-vertical.svg",
      data: (
        <div className="text-xl flex flex-col">
          <span>
            <b>Read IO/s</b> {disksIO.readsPerSecond}
          </span>
          <span>
            <b>Write IO/s</b> {disksIO.writesPerSecond}
          </span>
        </div>
      ),
    },
    {
      title: "Network - eth0",
      icon: "/icons/globe-alt.svg",
      data: (
        <div className="text-xl flex flex-col">
          <span>
            <b>Transmit</b> {eth0.transmit} Kbit/s
          </span>
          <span>
            <b>Receive</b> {eth0.receive} Kbit/s
          </span>
        </div>
      ),
    },
    {
      title: "Network - wlan0",
      icon: "/icons/wifi.svg",
      data: (
        <div className="text-xl flex flex-col">
          <span>
            <b>Transmit</b> {wlan0.transmit} Kbit/s
          </span>
          <span>
            <b>Receive</b> {wlan0.receive} Kbit/s
          </span>
        </div>
      ),
    },
  ];

  const systemSummary = (
    <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 text-sm px-2 pt-4 text-gray-400 text-center">
      <span className="text-left md:text-center">
        <b>Model</b>: {system.model}
      </span>
      <span className="text-left md:text-center">
        <b>Platform</b>: {system.platform}
      </span>
      <span className="text-left md:text-center">
        <b>Uptme</b>: {system.uptime}
      </span>
      <span className="text-left md:text-center">
        <b>Status</b>:{" "}
        <span className="text-green-400">
          {system.online ? "Online" : "Offline"}
        </span>
      </span>
    </div>
  );

  const cards = (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5 mx-2">
      {data.map((d, idx) => (
        <Card key={idx} {...d}>
          <div className="flex flex-col">
            <span className="p-2">{d.data}</span>
            {d.details ? <span className="text-base">{d.details}</span> : null}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      {systemSummary}
      {cards}

      <div
        onClick={onReload}
        className="w-16 h-16 rounded-full bg-black bg-opacity-60 shadow p-3 fixed bottom-8 right-8 z-30 cursor-pointer select-none "
      >
        <img
          src="/icons/refresh.svg"
          className={loading ? "animate-spin" : ""}
        />
      </div>
    </div>
  );
}
