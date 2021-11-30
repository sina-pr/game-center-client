import React from "react";

function Avatar({ name, backgroundColor }) {
  const avatarContainer = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "1.30rem",
    display: "flex",
    justifyContent: "center",
    margin: "8px 5px",
    alignItems: "center",
    textTransform: "uppercase",
    backgroundColor: backgroundColor,
  };
  return <div style={avatarContainer}>{name && name.charAt(0)}</div>;
}

export default Avatar;
