import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirm from "./Confirm";
import Success from "./Success";

function Form() {
  // const [step, setStep] = useState(1); replaced with router
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
    twitter: "",
    github: "",
  });

  // replaced with router
  // // proceed to next step
  // const nextStep = () => setStep(step + 1);

  // // go back to prev step
  // const prevStep = () => setStep(step - 1);

  // // go to step n
  // const goToStep = (n) => setStep(n);

  const inputChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  const { name, email, phone, password, facebook, twitter, github } = contact;

  const values = {
    name,
    email,
    phone,
    password,
    facebook,
    twitter,
    github,
  };

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Step1 {...routeProps} inputChange={inputChange} values={values} />
          )}
        />
        <Route
          exact
          path="/step2"
          render={(routeProps) => (
            <Step2 {...routeProps} inputChange={inputChange} values={values} />
          )}
        />
        <Route
          exact
          path="/step3"
          render={(routeProps) => (
            <Step3 {...routeProps} inputChange={inputChange} values={values} />
          )}
        />
        <Route
          exact
          path="/confirm"
          render={(routeProps) => <Confirm {...routeProps} values={values} />}
        />
        <Route
          exact
          path="/success"
          render={(routeProps) => <Success {...routeProps} />}
        />
      </Switch>
    </>
  );

  // switch (step) {
  //   case 1:
  //     return (
  //       <Step1
  //         nextStep={nextStep}
  //         inputChange={inputChange}
  //         values={values}
  //         goToStep={goToStep}
  //       />
  //     );
  //   case 2:
  //     return (
  //       <Step2
  //         nextStep={nextStep}
  //         prevStep={prevStep}
  //         inputChange={inputChange}
  //         values={values}
  //       />
  //     );
  //   case 3:
  //     return (
  //       <Step3
  //         nextStep={nextStep}
  //         prevStep={prevStep}
  //         inputChange={inputChange}
  //         values={values}
  //       />
  //     );
  //   case 4:
  //     return (
  //       <Confirm nextStep={nextStep} prevStep={prevStep} values={values} />
  //     );
  //   case 5:
  //     return <Success />;

  //   default:
  //     break;
  // }
}

export default Form;
