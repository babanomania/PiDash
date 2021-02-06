import { useState, useEffect } from "react";
import Layout from "../components/layout";

import getSystemStats from "../lib/getSystemStats";
import Dashboard from "../components/dashboard";

export default function Home(props) {
  const [state, setState] = useState({
    loading: false,
    data: props,
  });
  const [isError, setError] = useState(false);

  const RELOAD_MS = 10 * 1000;

  useEffect(() => {
    const timer = setTimeout(() => doReload(), RELOAD_MS);
    return () => clearTimeout(timer);
  });

  const doReload = (e) => {
    setState({ ...state, loading: true });
    fetch(`api/stats`)
      .then((res) =>
        res.json().then((json) => {
          setState({ data: json, loading: false });
          setError(false);

          const timer = setTimeout(() => doReload(), RELOAD_MS);
          clearTimeout(timer);
        })
      )
      .catch((err) => {
        setState({
          data: {
            ...state.data,
            system: {
              online: false,
              ...state.data.system,
            },
          },
          loading: false,
        });
        setError(true);

        const timer = setTimeout(() => doReload(), RELOAD_MS);
        clearTimeout(timer);
      });
  };

  const show_error = () => (
    <span className="text-8xl text-red-50 flex justify-center mt-20">
      Offline
    </span>
  );

  const show_progress = () => (
    <div className="w-12 h-12 rounded-full bg-black bg-opacity-60 shadow p-2 fixed bottom-8 right-8 z-30 cursor-pointer select-none ">
      <img src="/icons/refresh.svg" className="animate-spin" />
    </div>
  );

  return (
    <Layout active="Dashboard">
      {isError ? show_error() : <Dashboard {...state.data} />}
      {state.loading ? show_progress() : null}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const props = await getSystemStats();
  return { props };
}
