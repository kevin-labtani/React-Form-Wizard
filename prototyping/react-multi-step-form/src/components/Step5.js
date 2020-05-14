import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step5 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.opinion) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step6");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h3 className="mb-3">What is your opinion from 1 to 10?</h3>
      <Alerts />
      <h6>Step 5: opinion scale</h6>
      <div className="form-group">
        <label htmlFor="formControlRange" className="float-left">
          Bad
        </label>
        <label htmlFor="formControlRange" className="float-right">
          Good
        </label>
        <input
          type="range"
          className="custom-range"
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

export default Step5;
