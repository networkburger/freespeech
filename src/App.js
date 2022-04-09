import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WriteApp } from "./write/write";
import { Home } from "./home/home";
import { BuildApp } from "./build/build";
import { ChooseApp } from "./choose/choose";

import { currentLanguage, loc, setCurrentLanguage } from "./strings";
import { useMemo, useState } from "react";

export default function App() {
  const [lang, setLang] = useState(currentLanguage());
  const str = useMemo(() => loc(lang), [lang]);

  return (
    <Router>
      <Routes>
        <Route path="/write" element={<WriteApp str={str} />} />
        <Route path="/build" element={<BuildApp str={str} />} />
        <Route path="/choose" element={<ChooseApp str={str} />} />
        <Route
          path="/"
          element={
            <Home
              str={str}
              setCurrentLanguage={(newLang) => {
                setCurrentLanguage(newLang);
                setLang(newLang);
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}
