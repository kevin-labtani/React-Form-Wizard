import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step8 = ({ values, multiCheckboxChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (values.pet.length === 0) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step9");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h3 className="mb-3">What is your favorite pet?</h3>
      <Alerts />
      <p className="subtitles text-muted">Step 8: multiple choice</p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="cat"
          id="checkbox1"
          checked={values.pet.includes("cat")}
          onChange={multiCheckboxChange("pet")}
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.pet.includes("cat") ? "active" : ""
          }`}
          htmlFor="checkbox1"
        >
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
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.pet.includes("dog") ? "active" : ""
          }`}
          htmlFor="checkbox2"
        >
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
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.pet.includes("fish") ? "active" : ""
          }`}
          htmlFor="checkbox3"
        >
          Fish
        </label>
      </div>

      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger rounded-circle" onClick={back}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary rounded-circle" onClick={cont}>
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step8;
