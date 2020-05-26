import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import AvatarQuestion from "./AvatarQuestion";
import Navigation from "./Navigation";

import isEmail from "validator/lib/isEmail";
const Step1 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!isEmail(values.email)) {
      setAlert("Veuillez entrer une adresse email valide", "danger");
    } else {
      values.email === "admin@demo.com" ? push("/step3") : push("/step2");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <>
      <div className="row">
        <AvatarQuestion />
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
          <h3>What's your email?</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="email">
              <p className="subtitles text-muted">Step 1: email</p>
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              onChange={inputChange("email")}
              value={values.email}
              autoComplete="off"
              autoFocus
              placeholder="Enter your email here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

export default Step1;
