import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FancyText } from "../fancy-text";
import { Popover } from "../popover";
import { isEnglish, languageStrings } from "../strings";
import icons from "../svg-icons";
import "./home.css";

export function Home({ str, setCurrentLanguage }) {
  const [chooseLang, setChooseLang] = useState(false);
  useEffect(() => {
    document.title = str.general.appTitle;
  });

  return (
    <div className="home">
      <div className="pile">
        <div className="cloud">{icons.cloud}</div>
        <div className="pile-item menu-ui">
          <FancyText text={str.general.appTitle} />

          <div className="app-list">
            <Link to="/write">{str.write.title}</Link>
            <Link to="/build">{str.build.title}</Link>
            <Link to="/choose">{str.choose.title}</Link>
          </div>

          <button onClick={() => setChooseLang(true)}>
            {str.general.languageName}
          </button>
        </div>
      </div>

      {chooseLang ? (
        <Popover
          contentClass="choose-language"
          dismiss={() => setChooseLang(null)}
        >
          <h1>
            {str.general.language}
            {isEnglish(str.langCode) ? "" : " / Language"}
          </h1>
          {Object.keys(languageStrings).map((k) => (
            <button
              key={k}
              onClick={() => {
                setChooseLang(false);
                setCurrentLanguage(k);
              }}
            >
              {languageStrings[k].general.languageName}
            </button>
          ))}
        </Popover>
      ) : null}
    </div>
  );
}
