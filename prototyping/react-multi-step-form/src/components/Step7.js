import React from "react";
import { useHistory } from "react-router-dom";

const Step2 = ({ values, inputChange }) => {
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
      <h1 className="mb-5">Step 7: number</h1>
      <div className="form-group">
        <label htmlFor="number">Pick a number</label>
        <input
          type="number"
          className="form-control"
          name="number"
          onChange={inputChange("number")}
          value={values.number}
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

export default Step2;
