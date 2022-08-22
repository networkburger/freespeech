import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FancyText } from "../fancy-text";
import useLongPress from "../longpress";
import { Popover } from "../popover";
import { speak } from "../speak";
import icon from "../svg-icons";
import { baseCatalog } from "./base-catalog";
import "./build.css";

const initialState = {
  sentance: [],
  category: "other",
  catalog: baseCatalog,
};

function loadState() {
  return {
    ...initialState,
    ...JSON.parse(localStorage.getItem("buildCatalog") || "{}"),
  };
}

function saveState(s) {
  localStorage.setItem("buildCatalog", JSON.stringify(s));
}

function performAction(state, action) {
  switch (action.type) {
    case "sentance/add":
      return { ...state, sentance: [...state.sentance, action.word] };
    case "sentance/del":
      return {
        ...state,
        sentance: state.sentance.slice(0, state.sentance.length - 1),
      };
    case "sentance/del-index":
      return {
        ...state,
        sentance: state.sentance.filter((_, wi) => wi !== action.index),
      };
    case "category":
      return { ...state, category: action.category };
    case "word/add":
      return {
        ...state,
        catalog: {
          ...state.catalog,
          [action.category]: [
            ...(state.catalog[action.category] || []),
            action.word,
          ],
        },
      };
    case "word/del":
      const deleteCategory =
        action.category !== "other" &&
        state.catalog[action.category].length === 1;
      const catalog = {
        ...state.catalog,
        [action.category]: state.catalog[action.category].filter(
          (x) => x.s !== action.word
        ),
      };
      if (deleteCategory) {
        delete catalog[action.category];
      }
      return {
        ...state,
        category: deleteCategory ? "other" : state.category,
        catalog,
      };
    default:
      return state;
  }
}
function reducer(state, action) {
  const newState = performAction(state, action);
  saveState(newState);
  return newState;
}

export function BuildApp() {
  const [state, dispatch] = useReducer(reducer, loadState());
  const { sentance, category, catalog } = state;

  const [addWord, setAddWord] = useState(null);
  const [deleteWord, setDeleteWord] = useState(null);

  useEffect(() => {
    document.title = `BUILD - FREE SPEECH`;
  });

  return (
    <div className="app app-build">
      <header>
        <FancyText text="BUILD" />
        <Link to="/" className="rounded-blue-button">
          {icon.home}
        </Link>
        <span className="filler" />
        <button
          className="rounded-blue-button"
          onClick={() => setAddWord({ text: "", pronunciation: "", category })}
        >
          {icon.plus}
        </button>
      </header>

      <div className="sentance">
        <button
          className="icon-button"
          onClick={() => say(sentance.map((s) => s.p || s.s).join(" "))}
        >
          {icon.play}
        </button>
        <div className="words">
          {sentance.map((s, si) => (
            <Word
              key={si}
              word={s}
              press={() => say(s)}
              longpress={() =>
                dispatch({ type: "sentance/del-index", index: si })
              }
            />
          ))}
        </div>
        <button
          className="icon-button"
          onClick={() => dispatch({ type: "sentance/del" })}
        >
          {icon.backspace}
        </button>
      </div>
      <div className="category-select">
        {Object.keys(catalog).map((c) => (
          <button
            key={c}
            className={c === category ? "selected" : ""}
            onClick={() => dispatch({ type: "category", category: c })}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="category-content">
        <div className="catergory-words">
          {catalog[category].map((w, wi) => (
            <Word
              key={wi}
              word={w}
              longpress={() => setDeleteWord(w)}
              press={() => {
                say(w);
                dispatch({ type: "sentance/add", word: w });
              }}
            />
          ))}
        </div>
      </div>

      {addWord ? (
        <Popover contentClass="add-word" dismiss={() => setAddWord(null)}>
          <div className="add-word-content">
            <h2>Add New Word</h2>
            <div className="add-row">
              <input
                type="text"
                autoCapitalize="off"
                autoFocus={true}
                value={addWord.text}
                onChange={(e) =>
                  setAddWord({ ...addWord, text: e.target.value })
                }
              />
            </div>
            <div className="confirm-row">
              <button
                disabled={addWord.text.length < 1}
                className="rounded-blue-button"
                onClick={() =>
                  say({ s: addWord.text, p: addWord.pronunciation })
                }
              >
                {icon.play}
              </button>
              <button
                disabled={addWord.text.length < 1}
                className="rounded-blue-button"
                onClick={() => {
                  dispatch({
                    type: "word/add",
                    category: addWord.category,
                    word: { s: addWord.text, p: addWord.pronunciation },
                  });
                  setAddWord(null);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </Popover>
      ) : null}

      {deleteWord ? (
        <Popover contentClass="delete-word" dismiss={() => setDeleteWord(null)}>
          <h2>Delete Word</h2>
          <p>{`"${deleteWord.s}"`}</p>
          <button
            className="rounded-blue-button"
            onClick={() => {
              dispatch({
                type: "word/del",
                word: deleteWord.s,
                category,
              });
              setDeleteWord(null);
            }}
          >
            DELETE
          </button>
        </Popover>
      ) : null}
    </div>
  );
}

function say(word) {
  const actual = word.p || word.s || word;
  speak(actual);
}

function Word({ word, press, longpress }) {
  const longPressEvent = useLongPress(longpress, press, {
    shouldPreventDefault: true,
    delay: 500,
  });

  return (
    <button {...longPressEvent} className="word" onClick={press}>
      {word.s}
    </button>
  );
}
