import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React from "react";
// import { useForm } from "react-hook-form";
// import { useStoreContext } from "../../../context/store";
import IDOInfo from "./Step/idoInformation";
import Preview from "./Step/preview";
import ProjectInfo from "./Step/projectInfo";
import TokenVerify from "./Step/tokenVerify";
import { useWeb3React } from "@web3-react/core";

function getSteps() {
  return ["Token verify", "IDO information", "Project information", "Submit"];
}

const PublishForm = () => {
  const {account} = useWeb3React()
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  // const context = useStoreContext();

  if (!account) {
    return null;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    // if (activeStep === 0) {
    //   if (!context.tokenFormValidate()) {
    //     return false;
    //   }
    // } else if (activeStep === 1) {
    //   if (!context.idoFormValidate()) {
    //     return false;
    //   }
    // }
    handleNext();
  };

  //get Step by index
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <TokenVerify />;
      case 1:
        return <IDOInfo />;
      case 2:
        return <ProjectInfo />;
      case 3:
        return <Preview />;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{
            width: "100%",
            color: "white",
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div flex={1}>
          {activeStep === steps.length ? (
            <div ai="center">
              <p>All steps completed</p>
              <button onClick={handleReset}>
                Do again
              </button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <p fullWidth style={{ color: "red" }}>
                {/* {context.error[0]} */}
              </p>
              <div fd="row" jc="flex-end">
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  style={{ margin: 5 }}
                >
                  Back
                </button>
                {activeStep !== steps.length - 1 ? (
                  <button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ margin: 5 }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
export default PublishForm