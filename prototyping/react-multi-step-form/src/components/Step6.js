import React from "react";
import { useHistory } from "react-router-dom";

const Step6 = ({ values, inputChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/confirm");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Step 6: yes or no</h1>
      <h3>Is it yes, or is it no?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          name="yn"
          type="radio"
          value="yes"
          id="radio1"
          checked={values.yn === "yes"}
          onChange={inputChange("yn")}
        />
        <label className="form-check-label" htmlFor="radio1">
          Yes
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          name="yn"
          type="radio"
          value="no"
          id="radio2"
          checked={values.yn === "no"}
          onChange={inputChange("yn")}
        />
        <label className="form-check-label" htmlFor="radio2">
          No
        </label>
      </div>

      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={back}>
            Back
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary" onClick={cont}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step6;
