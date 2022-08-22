import { useEffect } from "react";
import { FancyText } from "../fancy-text";
import { Link } from "react-router-dom";
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
            <Link to="/write">WRITE</Link>
            <Link to="/build">BUILD</Link>
            <Link to="/choose">CHOOSE</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
