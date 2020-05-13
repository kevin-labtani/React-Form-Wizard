import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

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
    <div className="form-container">
      <h3 className="mb-5">Step 6: yes or no</h3>
      <h3>Is it yes, or is it no?</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="yes"
          id="checkbox1"
          checked={values.yn === "yes"}
          onChange={SingleCheckboxChange("yn")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Yes
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="no"
          id="checkbox2"
          checked={values.yn === "no"}
          onChange={SingleCheckboxChange("yn")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
          No
        </label>
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

export default Step6;
