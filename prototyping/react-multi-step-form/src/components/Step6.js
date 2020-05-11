import React from "react";
import { useHistory } from "react-router-dom";

const Step6 = ({ values, SingleCheckboxChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step7");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 6: yes or no</h1>
      <h3>Is it yes, or is it no?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="yes"
          id="checkbox1"
          checked={values.yn === "yes"}
          onChange={SingleCheckboxChange("yn")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Yes
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="no"
          id="checkbox2"
          checked={values.bw === "no"}
          onChange={SingleCheckboxChange("yn")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
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
