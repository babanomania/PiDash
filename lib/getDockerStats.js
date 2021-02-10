import si from "systeminformation";

export default async function getDockerStats() {
  const dockerContainers = await si.dockerContainers();

  return {
    docker: dockerContainers.map((d) => {
      return {
        name: d.name,
        image: d.image,
        state: d.state,
      };
    }),
  };
}
