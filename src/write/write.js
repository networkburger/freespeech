import React, { useEffect, useReducer, useRef } from "react";
import "./write.css";
import { Link } from "react-router-dom";
import { FancyText } from "../fancy-text";
import icon from "../svg-icons";
import { speak } from "../strings";

export function WriteApp({ str }) {
  useEffect(() => {
    document.title = `${str.write.title} - ${str.general.appTitle}`;
  });

  const [state, dispatch] = useReducer(reducer, pullFromStorage());

  return (
    <div className="app app-write">
      <header>
        <Link to="/" className="rounded-blue-button">
          {icon.home}
        </Link>
        <FancyText text={str.write.title} />
      </header>

      {state.map((t, i) => (
        <TextLine key={i} text={t} index={i} lang={str} dispatch={dispatch} />
      ))}
    </div>
  );
}

function setAt(a, i, v) {
  return a.map((av, ai) =>
    ai === i ? (typeof v === "function" ? v(av, ai) : v) : av
  );
}

const nlines = 20;

function alphabet(len) {
  return "abcdefghijklmnopqrstuvwxyz".slice(0, len);
}

function persist(state) {
  for (let i = 0; i < state.length; ++i) {
    localStorage.setItem("line" + i, state[i]);
  }
  return state;
}

const pullFromStorage = () =>
  new Array(nlines)
    .fill(0)
    .map((_, i) => localStorage.getItem("line" + i) || "");

function reducer(state, action) {
  switch (action.type) {
    case "set-line":
      return persist(setAt(state, action.index, action.text));
    default:
      return state;
  }
}

function TextLine({ lang, text, dispatch, index }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (index === 0) {
      inputRef.current.focus();
    }
  }, [index]);
  return (
    <div className="txt-line">
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          let t = text.toLowerCase();
          if (t === alphabet(t.length)) {
            t = t
              .split("")
              .map((x) => `${x}. `)
              .join();
          }
          speak(lang, text.toLowerCase());
        }}
      >
        {icon.play}
      </button>
      <input
        type="text"
        ref={inputRef}
        value={text}
        autoFocus
        onChange={(e) =>
          dispatch({ type: "set-line", index, text: e.target.value })
        }
      ></input>
    </div>
  );
}
