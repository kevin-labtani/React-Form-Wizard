import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
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
      <h1 className="mb-5 text-center">Step 1: email</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={inputChange("email")}
          value={values.email}
        />
      </div>

      <br />

      <div className="text-right">
        <button className="btn btn-primary" onClick={cont}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step1;
