import Layout from "../components/layout";
import Card from "../components/card";
import si from "systeminformation";
import moment from "moment";

export default function Home({
  system,
  cpu,
  mem,
  swap,
  disk,
  disksIO,
  eth0,
  wlan0,
}) {
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

  return (
    <Layout active="Dashboard">
      <div>
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
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5 mx-2">
          {data.map((d, idx) => (
            <Card key={idx} {...d}>
              <div className="flex flex-col">
                <span className="p-2">{d.data}</span>
                {d.details ? (
                  <span className="text-base">{d.details}</span>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const system = await si.system();
  const time = await si.time();
  const osInfo = await si.osInfo();
  const cpuTemperature = await si.cpuTemperature();
  const currentLoad = await si.currentLoad();
  const mem = await si.mem();
  const fsSize = await si.fsSize();

  //read it twice
  let disksIO = await si.disksIO();
  disksIO = await si.disksIO();

  //read it twice
  let networkStats = await si.networkStats();
  networkStats = await si.networkStats();

  const networkStatsEth0 = await si.networkStats("eth0");
  const networkStatsWlan0 = await si.networkStats("wlan0");

  return {
    props: {
      system: {
        online: true,
        model: system.model,
        platform: `${osInfo.platform} (${osInfo.distro})`,
        uptime: moment().subtract(time.uptime, "s").fromNow(),
      },
      cpu: {
        temperature: cpuTemperature.main ? cpuTemperature.main : -1,
        usage: parseInt(currentLoad.currentLoad),
      },
      mem: {
        usage: parseInt((mem.used / mem.total) * 100),
        freeMB: parseFloat(mem.free / (1024 * 1024)).toFixed(0),
        totalMB: parseInt(mem.total / (1024 * 1024)),
      },
      swap: {
        usage: parseInt((mem.swapused / mem.swaptotal) * 100),
        freeMB: parseFloat(mem.swapfree / (1024 * 1024)).toFixed(0),
        totalMB: parseInt(mem.swaptotal / (1024 * 1024)),
      },
      disk: {
        usedPercent: parseInt(fsSize[0].use),
        usedGB: parseInt(fsSize[0].used / (1024 * 1024 * 1024)),
        totalGB: parseInt(fsSize[0].size / (1024 * 1024 * 1024)),
      },
      disksIO: {
        readsPerSecond: parseFloat(disksIO.rIO_sec).toFixed(2),
        writesPerSecond: parseFloat(disksIO.wIO_sec).toFixed(2),
      },
      eth0: {
        transmit:
          networkStatsEth0 && networkStatsEth0.length > 0
            ? parseFloat(networkStatsEth0[0].tx_sec / 125).toFixed(2)
            : -1,
        receive:
          networkStatsEth0 && networkStatsEth0.length > 0
            ? parseFloat(networkStatsEth0[0].rx_sec / 125).toFixed(2)
            : -1,
      },
      wlan0: {
        transmit:
          networkStatsWlan0 && networkStatsWlan0.length > 0
            ? parseFloat(networkStatsWlan0[0].tx_sec / 125).toFixed(2)
            : -1,
        receive:
          networkStatsWlan0 && networkStatsWlan0.length > 0
            ? parseFloat(networkStatsWlan0[0].rx_sec / 125).toFixed(2)
            : -1,
      },
    },
  };
}
