import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

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
      <h3 className="mb-3">Step 8: multiple choice</h3>
      <h6>What is your favorite pet?</h6>
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
          <button className="btn btn-danger btn-circle" onClick={back}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary btn-circle" onClick={cont}>
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step8;
