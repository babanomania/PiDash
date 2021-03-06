import Card from "./card";

import {
  icon_chip,
  icon_fire,
  icon_sd_card,
  icon_switch_horizontal,
  icon_memory,
  icon_switch_vertical,
  icon_ethernet,
  icon_wifi,
} from "./icons";

export default function Dashboard(props) {
  const { system, cpu, mem, swap, disk, disksIO, eth0, wlan0 } = props;

  const data = [
    {
      title: "CPU Temperature",
      icon: icon_fire,
      data: `${cpu.temperature}°C`,
      status:
        cpu.temperature > 75
          ? "warning"
          : cpu.temperature > 60
          ? "info"
          : "neutral",
    },
    {
      title: "CPU Usage",
      icon: icon_chip,
      data: `${cpu.usage}%`,
      status: cpu.usage > 90 ? "warning" : cpu.usage > 75 ? "info" : "neutral",
    },
    {
      title: "Memory Usage",
      icon: icon_memory,
      data: `${mem.usage}%`,
      details: `${mem.usedMB} / ${mem.totalMB} MB`,
      status: mem.usage > 90 ? "warning" : mem.usage > 75 ? "info" : "neutral",
    },
    {
      title: "SWAP Usage",
      icon: icon_switch_horizontal,
      data: `${swap.usage}%`,
      details: `${swap.usedMB} / ${swap.totalMB} MB`,
      status:
        swap.usage > 90 ? "warning" : swap.usage > 75 ? "info" : "neutral",
    },
    {
      title: "Disk Usage",
      icon: icon_sd_card,
      data: `${disk.usedPercent}%`,
      details: `${disk.usedGB} / ${disk.totalGB} GB`,
      status:
        disk.usedPercent > 90
          ? "warning"
          : disk.usedPercent > 75
          ? "info"
          : "neutral",
    },
    {
      title: "DisK IO",
      icon: icon_switch_vertical,
      data: (
        <div className="text-base md:text-xl flex flex-col">
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
      icon: icon_ethernet,
      data: (
        <div className="text-base md:text-xl flex flex-col">
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
      icon: icon_wifi,
      data: (
        <div className="text-base md:text-xl flex flex-col">
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
        {system.online ? (
          <span className="text-green-400">Online</span>
        ) : (
          <span className="text-red-400">Offline</span>
        )}
      </span>
    </div>
  );

  const cards = (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5 mx-4 md:mx-2">
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
    </div>
  );
}
