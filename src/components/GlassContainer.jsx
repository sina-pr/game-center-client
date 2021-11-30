import React from "react";

function GlassContainer({ children, style }) {
  const myStyle = {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
    padding: "18px 12px",
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    ...style,
  };
  return <div style={myStyle}>{children}</div>;
}

export default GlassContainer;
