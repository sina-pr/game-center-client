import React from "react";

function Circle({ phase, activeStep }) {
  const circleStyle = {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor:
      phase <= activeStep ? "#d1b536" : "rgba(255, 255, 255, 0.1)",
    alignSelf: "left",
    color: "#fff",
    fontWidth: "bold",
    textAlign: "center",
  };

  return <div style={circleStyle}>{phase}</div>;
}

function Step({ text, phase, activeStep }) {
  const stepStyle = {
    display: "flex",
    flexDirection: "column",
    flex: phase !== 3 ? 1 : 0,
  };
  return (
    <div style={stepStyle}>
      <div className="row">
        <Circle color="#d1b536" activeStep={activeStep} phase={phase} />
        <div style={{ marginLeft: 5.5 }}>{text}</div>
      </div>
      <div
        style={{
          margin: "4px 0 4px 9px",
          borderLeft: "2px solid white ",
          flex: 1,
        }}
      ></div>
    </div>
  );
}

export default Step;
