import React, { useEffect, useState } from "react";
import "./choose.css";
import { FancyText } from "../fancy-text";
import icon from "../svg-icons";
import { speak } from "../speak";
import { Link } from "react-router-dom";

export function ChooseApp() {
  useEffect(() => {
    document.title = `CHOOSE - FREE SPEECH`;
  });

  const pages = [
    {
      title: "1",
      words: [
        [["I", "eye"], "want", "home", "beach", "shopping", "wait"],
        ["you", "go", "school", "soft play", "toy shop", "again"],
        ["we", "leave", "taxi", "swimming", "diane's house", "finished"],
        ["like", "now", "car", "playground", "fun", "stop"],
        ["don't like", "later", "toilet", "woods", "boring", "help"],
      ],
    },
    {
      title: "2",
      words: [
        [
          ["I want"],
          "I do not want",
          "I like",
          "I do not like",
          "taxi",
          "school",
        ],
        ["home", "car", "shop", "swimming", "playground", "trampoline"],
        ["sleep", "iPad", "diane and nana", "woods", "walk", "shake break"],
        ["food", "drink", "chips", "crisps", "snack", "juice"],
        ["later", "toilet", "woods", "boring", "help", "leave me alone"],
      ],
    },
  ];

  function wordDisplay(w) {
    return Array.isArray(w) ? w[0] : w;
  }
  function wordPronunciation(w) {
    return Array.isArray(w) ? w[1] : w;
  }
  function isLongText(str) {
    return str.length > 18 || str.split(" ").find((w) => w.length > 9);
  }

  const [page, setPage] = useState(0);
  const { words } = pages[page];

  return (
    <div className="app app-choose">
      <header>
        <Link to="/" className="rounded-blue-button">
          {icon.home}
        </Link>
        <FancyText text="CHOOSE" />
      </header>

      <div className="word-grid">
        {words.map((row, ri) => (
          <div className="word-row" key={ri}>
            {row.map((w, wi) => (
              <div
                key={wi}
                className={`word-box`}
                onMouseUp={() => speak(wordPronunciation(w))}
              >
                <div className="card">
                  <span
                    className={`${
                      isLongText(wordDisplay(w)) ? "long-text" : ""
                    }`}
                  >
                    {wordDisplay(w)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="pages">
        {pages.map((p, pi) => (
          <div key={pi} className="page">
            <button
              className={`rounded-blue-button ${
                pi === page ? "rounded-blue-button-active" : ""
              }`}
              onClick={() => setPage(pi)}
            >
              <span>{p.title}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
