import React from "react";
import { useHistory } from "react-router-dom";

const Step10 = ({ values, SingleCheckboxChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step11");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 10: yes or no - alt</h1>
      <h3>Pick Black or White</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="black"
          id="checkbox1"
          checked={values.bw === "black"}
          onChange={SingleCheckboxChange("bw")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Black
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="white"
          id="checkbox2"
          checked={values.bw === "white"}
          onChange={SingleCheckboxChange("bw")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
          White
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

export default Step10;
