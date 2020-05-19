import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step6 = ({ values, SingleCheckboxChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.yn) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step7");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <>
      <h3 className="mb-3">Is it yes, or is it no?</h3>
      <Alerts />
      <p className="subtitles text-muted">Step 6: yes or no</p>
      <div className="form-check pl-0 col-lg-2">
        <input
          className="form-check-input"
          type="checkbox"
          value="yes"
          id="checkbox1"
          checked={values.yn === "yes"}
          onChange={SingleCheckboxChange("yn")}
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.yn === "yes" ? "active" : ""
          }`}
          htmlFor="checkbox1"
        >
          Yes
        </label>
      </div>
      <div className="form-check pl-0 col-lg-2">
        <input
          className="form-check-input"
          type="checkbox"
          value="no"
          id="checkbox2"
          checked={values.yn === "no"}
          onChange={SingleCheckboxChange("yn")}
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.yn === "no" ? "active" : ""
          }`}
          htmlFor="checkbox2"
        >
          No
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
    </>
  );
};

export default Step6;
