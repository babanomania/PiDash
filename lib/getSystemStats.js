import si from "systeminformation";
import moment from "moment";

export default async function getSystemStats() {
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
  };
}
