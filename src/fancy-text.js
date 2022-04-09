import "./fancy-text.css";

export function FancyText({ text }) {
  const words = text.split(" ").map((w) => Array.from(w));
  return (
    <div className="fancy-color-text">
      {words.map((w, wi) => (
        <div key={wi} className="fancy-word">
          {w.map((c, i) => (
            <span
              key={i}
              className={
                i === 0 ? "leftmost" : i === w.length - 1 ? "rightmost" : ""
              }
            >
              {c}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
