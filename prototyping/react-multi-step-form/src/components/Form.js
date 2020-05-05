import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Confirm from "./Confirm";
import Success from "./Success";

const Form = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    lunch: "",
    contactCheck: "",
    opinion: "",
    yn: "",
    number: "",
    pizza: "",
    spaghetti: "",
    soup: "",
    pet: [],
  });

  // load data from localSotrage
  useEffect(() => {
    const data = localStorage.getItem("contact");
    if (data) {
      setContact(JSON.parse(data));
    }
  }, []);

  // save data to localStorage
  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contact));
  }, [contact]);

  const inputChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  const checkboxChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.checked });
  };

  const multiCheckboxChange = (input) => (e) => {
    const oldArr = contact[input];
    if (e.target.checked) {
      oldArr.push(e.target.value);
      setContact({
        ...contact,
        [input]: oldArr,
      });
    } else {
      const filteredArr = oldArr.filter(pet => pet !== e.target.value);
      setContact({
        ...contact,
        [input]: filteredArr,
      });
    }
  };

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Step1 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step2"
          render={(routeProps) => (
            <Step2 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step3"
          render={(routeProps) => (
            <Step3 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step4"
          render={(routeProps) => (
            <Step4
              {...routeProps}
              checkboxChange={checkboxChange}
              values={contact}
            />
          )}
        />
        <Route
          exact
          path="/step5"
          render={(routeProps) => (
            <Step5 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step6"
          render={(routeProps) => (
            <Step6 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step7"
          render={(routeProps) => (
            <Step7 {...routeProps} inputChange={inputChange} values={contact} />
          )}
        />
        <Route
          exact
          path="/step8"
          render={(routeProps) => (
            <Step8
              {...routeProps}
              checkboxChange={checkboxChange}
              values={contact}
            />
          )}
        />
        <Route
          exact
          path="/step9"
          render={(routeProps) => (
            <Step9
              {...routeProps}
              multiCheckboxChange={multiCheckboxChange}
              values={contact}
            />
          )}
        />
        <Route
          exact
          path="/confirm"
          render={(routeProps) => <Confirm {...routeProps} values={contact} />}
        />
        <Route
          exact
          path="/success"
          render={(routeProps) => <Success {...routeProps} />}
        />
      </Switch>
    </>
  );
};

export default Form;
