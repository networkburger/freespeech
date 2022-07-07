import { WriteApp } from "./write/write";
import { Home } from "./home/home";
import { BuildApp } from "./build/build";
import { ChooseApp } from "./choose/choose";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const app = urlParams.get("app");

  return app === "write" ? (
    <WriteApp />
  ) : app === "build" ? (
    <BuildApp />
  ) : app === "choose" ? (
    <ChooseApp />
  ) : (
    <Home />
  );
}
