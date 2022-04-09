import React from "react";

export function Popover({ dismiss, contentClass = "", children }) {
  return (
    <div className="popover">
      <div className="popover-background" onMouseUp={dismiss} />
      <div className={`popover-content ${contentClass}`}>{children}</div>
    </div>
  );
}
