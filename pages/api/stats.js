import getSystemStats from "../../lib/systemStats";

export default async (req, res) => {
  let data = await getSystemStats();
  res.status(200).json(data);
};
