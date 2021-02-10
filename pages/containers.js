import Layout from "../components/layout";
import getDockerStats from "../lib/getDockerStats";

import Card from "../components/card";

export default function Conatiner({ docker }) {
  return (
    <Layout active="Containers">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5 mx-2">
        {docker.map((dkr) => (
          <Card title={dkr.name}>
            <span className="flex flex-coljustify-center">
              <div className="text-base font-bold">
                <b>Name</b> {dkr.image}
              </div>
              <div className="text-base">
                <b>Status</b> {dkr.state}
              </div>
            </span>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const props = await getDockerStats();
  return { props };
}
