import getDockerStats from "../../../lib/getDockerStats";

export default async (req, res) => {
  let data = await getDockerStats();
  res.status(200).json(data);
};
