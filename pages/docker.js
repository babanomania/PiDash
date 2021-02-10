import { useState, useEffect } from "react";
import Layout from "../components/layout";
import getDockerStats from "../lib/getDockerStats";

import { icon_refresh } from "../components/icons";
import Container from "../components/containers";

export default function Docker(props) {
  const [state, setState] = useState({
    loading: false,
    data: props,
  });
  const [isError, setError] = useState(false);

  const RELOAD_MS = 60 * 1000;

  useEffect(() => {
    const timer = setTimeout(() => doReload(), RELOAD_MS);
    return () => clearTimeout(timer);
  });

  const doReload = (e) => {
    setState({ ...state, loading: true });
    fetch(`api/stats/docker`)
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
    <span className="text-8xl text-red-50 dark:text-gray-700 flex justify-center mt-20">
      Offline
    </span>
  );

  const show_progress = () => (
    <div className="w-12 h-12 rounded-full bg-black dark:bg-gray-600 bg-opacity-60 shadow p-2 fixed bottom-8 right-8 z-30 cursor-pointer select-none text-white">
      {icon_refresh}
    </div>
  );

  return (
    <Layout active="Docker">
      {isError ? show_error() : <Container {...state.data} />}
      {state.loading ? show_progress() : null}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const props = await getDockerStats();
  return { props };
}
