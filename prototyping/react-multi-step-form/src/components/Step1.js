import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

import isEmail from "validator/lib/isEmail";
const Step1 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!isEmail(values.email)) {
      setAlert("Veuillez entrer une adresse email valide", "danger");
    } else {
      values.email === "admin@demo.com" ? push("/step3") : push("/step2");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-2 offset-1 col-lg-1 offset-lg-2 text-center align-self-center">
          {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
          <i className="fas fa-user-circle avatar" />
        </div>
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble">
          <h3>What's your email?</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-10 offset-1 col-lg-8 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1">
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

          <br />

          <div className="text-right">
            <button className="btn btn-primary rounded-circle" onClick={cont}>
              <i className="fas fa-arrow-down" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
