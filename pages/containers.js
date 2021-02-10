import Layout from "../components/layout";
import getDockerStats from "../lib/getDockerStats";

import Card from "../components/card";

export default function Conatiner({ docker }) {
  return (
    <Layout active="Containers">
      <div className="grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-4 md:mt-5 md:mx-2">
        {docker.map((dkr) => (
          <Card title={dkr.name} isList={true}>
            <span className="flex flex-col text-left md:text-center md:justify-center">
              <div className="text-lg">{dkr.image}</div>
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
