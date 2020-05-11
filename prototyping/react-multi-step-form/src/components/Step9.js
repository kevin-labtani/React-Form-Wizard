import React from "react";
import { useHistory } from "react-router-dom";

const Step9 = ({ values, multiCheckboxChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step10");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 9: multiple choice - alt</h1>
      <h3>What is your favorite pet?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="cat"
          id="checkbox1"
          checked={values.pet.includes("cat")}
          onChange={multiCheckboxChange("pet")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Cat
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="dog"
          id="checkbox2"
          checked={values.pet.includes("dog")}
          onChange={multiCheckboxChange("pet")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
          Dog
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="fish"
          id="checkbox3"
          checked={values.pet.includes("fish")}
          onChange={multiCheckboxChange("pet")}
        />
        <label className="form-check-label" htmlFor="checkbox3">
          Fish
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

export default Step9;
