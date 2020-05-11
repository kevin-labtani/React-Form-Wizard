import React from "react";
import { useHistory } from "react-router-dom";

const Step3 = ({ values, inputChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step4");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 3: single choice</h1>
      <h3>What do you want for lunch?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          name="lunch"
          type="radio"
          value="sandwich"
          id="radio1"
          checked={values.lunch === "sandwich"}
          onChange={inputChange("lunch")}
        />
        <label className="form-check-label" htmlFor="radio1">
          Sandwich
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          name="lunch"
          type="radio"
          value="tuna"
          id="radio2"
          checked={values.lunch === "tuna"}
          onChange={inputChange("lunch")}
        />
        <label className="form-check-label" htmlFor="radio2">
          Tuna
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          name="lunch"
          type="radio"
          value="fries"
          id="radio3"
          checked={values.lunch === "fries"}
          onChange={inputChange("lunch")}
        />
        <label className="form-check-label" htmlFor="radio3">
          French fries
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

export default Step3;
