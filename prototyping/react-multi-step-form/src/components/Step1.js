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
    <div className="form-container">
      <h3 className="mb-3">What's your email?</h3>
      <Alerts />
      <div className="form-group">
        <label htmlFor="email">
          <h6>Step 1: email</h6>
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={inputChange("email")}
          value={values.email}
          autoComplete="off"
          autoFocus
        />
      </div>

      <br />

      <div className="text-right">
        <button className="btn btn-primary btn-circle" onClick={cont}>
          <i className="fas fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default Step1;
