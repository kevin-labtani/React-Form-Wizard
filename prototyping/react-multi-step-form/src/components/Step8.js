import React from "react";
import { useHistory } from "react-router-dom";

const Step8 = ({ values, checkboxChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step9");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 8: multiple choice</h1>
      <h3>What do you want for dinner?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="pizza"
          id="checkbox1"
          checked={values.pizza}
          onChange={checkboxChange("pizza")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Pizza
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="spaghetti"
          id="checkbox2"
          checked={values.spaghetti}
          onChange={checkboxChange("spaghetti")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
          Spaghetti
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="soup"
          id="checkbox3"
          checked={values.soup}
          onChange={checkboxChange("soup")}
        />
        <label className="form-check-label" htmlFor="checkbox3">
          Soup
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

export default Step8;
