import { useState } from "react";
import Layout from "../components/layout";

import getSystemStats from "../lib/systemStats";
import Dashboard from "../components/dashboard";

export default function Home(props) {
  const [data, setData] = useState(props);
  const [loading, isLoading] = useState(false);

  return (
    <Layout active="Dashboard">
      <Dashboard
        {...data}
        loading={loading}
        onReload={(e) => {
          isLoading(true);
          fetch(`api/stats`).then((res) =>
            res.json().then((json) => {
              setData(json);
              isLoading(false);
            })
          );
        }}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const props = await getSystemStats();
  return { props };
}
