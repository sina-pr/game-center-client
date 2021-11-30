import React from "react";
import GlassContainer from "../GlassContainer";
import Step from "./Step";

function Stepper({ steps, activeStep }) {
  return (
    <GlassContainer
      style={{
        marginRight: ".7rem",
        justifyContent: "space-around",
      }}
    >
      {steps.map((s, index) => {
        return (
          <Step
            key={index}
            activeStep={activeStep}
            text={s.text}
            phase={s.step}
          />
        );
      })}
    </GlassContainer>
  );
}

export default Stepper;
