import { WriteApp } from "./write/write";
import { Home } from "./home/home";
import { BuildApp } from "./build/build";
import { ChooseApp } from "./choose/choose";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NedditApp } from "./neddit";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/write" element={<WriteApp />} />
        <Route path="/build" element={<BuildApp />} />
        <Route path="/choose" element={<ChooseApp />} />
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/neddit" element={<NedditApp />} />
      </Routes>
    </Router>
  );
}
