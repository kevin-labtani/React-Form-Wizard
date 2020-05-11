import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

const Step1 = ({ values, inputChange }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { push } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (values.email === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      values.email === "admin@demo" ? push("/step3") : push("/step2");
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
