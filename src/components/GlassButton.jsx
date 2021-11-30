import React from "react";
import "./GlassButton.css";

function GlassButton({ props, text, onClick, style }) {
  return (
    <button onClick={onClick} className="btn" style={style} {...props}>
      {text}
    </button>
  );
}

export default GlassButton;
