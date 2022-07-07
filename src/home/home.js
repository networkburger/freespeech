import { useEffect } from "react";
import { FancyText } from "../fancy-text";
import icons from "../svg-icons";
import "./home.css";

export function Home() {
  useEffect(() => {
    document.title = "FREE SPEECH";
  });

  return (
    <div className="home">
      <div className="pile">
        <div className="cloud">{icons.cloud}</div>
        <div className="pile-item menu-ui">
          <FancyText text="FREE SPEECH" />

          <div className="app-list">
            <a href="/index.html?app=write">WRITE</a>
            <a href="/index.html?app=build">BUILD</a>
            <a href="/index.html?app=choose">CHOOSE</a>
          </div>
        </div>
      </div>
    </div>
  );
}
