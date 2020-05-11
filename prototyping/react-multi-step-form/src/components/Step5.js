import React from "react";
import { useHistory } from "react-router-dom";

const Step5 = ({ values, inputChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step6");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 5: opinion scale</h1>
      <h3>What is your opinion from 1 to 10?</h3>
      <div className="form-group">
        <label htmlFor="formControlRange">Example Range input</label>
        <input
          type="range"
          className="form-control-range"
          id="formControlRange"
          min="1"
          max="10"
          step="1"
          onChange={inputChange("opinion")}
          value={values.opinion}
        />
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

export default Step5;
