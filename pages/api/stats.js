import getSystemStats from "../../lib/getSystemStats";

export default async (req, res) => {
  let data = await getSystemStats();
  res.status(200).json(data);
};
