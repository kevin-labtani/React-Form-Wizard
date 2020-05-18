import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step2 = ({ values, inputChange }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.number || values.number < 0 || values.number > 10) {
      setAlert("Please enter a number between 0 and 10", "danger");
    } else {
      push("/step8");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <>
      <h3 className="mb-3">Please pick a number between 1 and 10</h3>
      <Alerts />
      <div className="form-group">
        <label htmlFor="number">
          <p className="subtitles text-muted">Step 7: number</p>
        </label>
        <input
          type="number"
          className="form-control form-control-lg"
          name="number"
          onChange={inputChange("number")}
          value={values.number}
          min={0}
          max={10}
          autoFocus
          placeholder="Enter a value here"
        />
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
    </>
  );
};

export default Step2;
