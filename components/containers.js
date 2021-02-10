import Layout from "./layout";

import Card from "./card";
import { icon_docker } from "./icons";

export default function Container(props) {
  const { docker } = props;

  const getState = (state) => {
    return state === "running" ? (
      <span className="text-green-600 dark:text-green-400 ">{state}</span>
    ) : state === "created" ? (
      <span className="text-yellow-600 dark:text-yellow-300">{state}</span>
    ) : (
      <span>{state}</span>
    );
  };

  return (
    <div className="grid gap-0 md:gap-4 grid-cols-1 md:grid-cols-4 md:mt-5 md:mx-2">
      {docker.map((dkr) => (
        <Card title={dkr.name} icon={icon_docker} listMode={true}>
          <span className="flex flex-col text-left md:text-center md:justify-center">
            <div className="text-lg">{dkr.image}</div>
            <div className="text-base">
              <b>state:</b> {getState(dkr.state)}
            </div>
          </span>
        </Card>
      ))}
    </div>
  );
}
