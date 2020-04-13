import React, { useState } from "react";
import AccountSetup from "./AccountSetup";
import SocialProfiles from "./SocialProfiles";
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

  const inputChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  const { name, email, phone, password, facebook, twitter, github } = contact;

  const values = { name, email, phone, password, facebook, twitter, github };

  switch (step) {
    case 1:
      return (
        <AccountSetup
          nextStep={nextStep}
          inputChange={inputChange}
          values={values}
        />
      );
    case 2:
      return (
        <SocialProfiles
          nextStep={nextStep}
          prevStep={prevStep}
          inputChange={inputChange}
          values={values}
        />
      );
    case 3:
      return (
        <Confirm nextStep={nextStep} prevStep={prevStep} values={values} />
      );
    case 4:
      return <Success />;

    default:
      break;
  }
}

export default Form;
