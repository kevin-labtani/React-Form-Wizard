import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirm from "./Confirm";
import Success from "./Success";

function Form() {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
    twitter: "",
    github: "",
  });

  // proceed to next step
  const nextStep = () => setStep(step + 1);

  // go back to prev step
  const prevStep = () => setStep(step - 1);

  // go to step n
  const goToStep = (n) => setStep(n);

  const inputChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  const { name, email, phone, password, facebook, twitter, github } = contact;

  const values = { name, email, phone, password, facebook, twitter, github };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          inputChange={inputChange}
          values={values}
          goToStep={goToStep}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          inputChange={inputChange}
          values={values}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          inputChange={inputChange}
          values={values}
        />
      );
    case 4:
      return (
        <Confirm nextStep={nextStep} prevStep={prevStep} values={values} />
      );
    case 5:
      return <Success />;

    default:
      break;
  }
}

export default Form;
