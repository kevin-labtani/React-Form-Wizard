import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

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
      <h3 className="mb-3">Step 5: opinion scale</h3>
      <h6>What is your opinion from 1 to 10?</h6>
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
          <button className="btn btn-danger btn-circle" onClick={back}>
            <i class="fas fa-arrow-left" />
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary btn-circle" onClick={cont}>
            <i class="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
