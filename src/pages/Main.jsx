import React from "react";
import GlassContainer from "../components/GlassContainer";
import Lobby from "../components/Lobby";
import Welcome from "../components/Welcome";

function Main() {
  return (
    <div className="container">
      <Welcome />
      <Lobby />
    </div>
  );
}

export default Main;
