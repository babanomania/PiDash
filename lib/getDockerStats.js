import si from "systeminformation";

export default async function getDockerStats() {
  const dockerContainers = await si.dockerContainers();

  return {
    docker: [
      {
        name: "bitwardenrs",
        image: "bitwardenrs/server:latest",
        state: "running",
      },
      {
        name: "lucid_bose",
        image: "portainer/portainer:linux-arm",
        state: "running",
      },
      {
        name: "PiHole",
        image: "pihole/pihole:latest",
        state: "running",
      },
    ],
  };
  // return {
  //   docker: dockerContainers.map((d) => {
  //     return {
  //       name: d.name,
  //       image: d.image,
  //       state: d.state,
  //     };
  //   }),
  // };
}
