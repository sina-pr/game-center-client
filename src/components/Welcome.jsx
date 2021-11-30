import React from "react";
import GlassContainer from "./GlassContainer";

function Welcome() {
  return (
    <GlassContainer>
      <h1 style={{ textAlign: "center", margin: "10px 0 " }}>
        Welcome to{" "}
        <span
          style={{
            backgroundColor: "#d1b536",
            padding: "5px",
            borderRadius: "7px",

            textTransform: "uppercase",
          }}
        >
          game
        </span>{" "}
        center!
      </h1>
      <h4 style={{ textAlign: "center" }}>
        Find your friend and play online :)
      </h4>
    </GlassContainer>
  );
}

export default Welcome;
