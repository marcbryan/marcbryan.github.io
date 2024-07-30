import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useTitle } from "../App";
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

function Home() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  useTitle(`${t("home")} | ${t("title")}`);

  return (
    <main>
      <h1>{t("home")}</h1>

      <div className="container" style={{textAlign: "center"}}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </main>
  );
}
export default Home;