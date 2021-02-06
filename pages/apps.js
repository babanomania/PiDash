import Layout from "../components/layout";
import shortcuts from "../shortcut.config";

import Card from "../components/card";

export default function Home() {
  return (
    <Layout active="Applications">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5 mx-2">
        {shortcuts.map((skt) => (
          <a href={skt.link}>
            <Card title={skt.title}>
              <span className="flex justify-center">
                <img src={skt.logo} className="w-16 h-16"></img>
              </span>
            </Card>
          </a>
        ))}
      </div>
    </Layout>
  );
}
