import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirm from "./Confirm";
import Success from "./Success";

function Form() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
    twitter: "",
    github: "",
  });

  // get data from localSotrage
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
}

export default Form;
