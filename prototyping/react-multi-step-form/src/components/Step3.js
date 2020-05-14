import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step3 = ({ values, SingleCheckboxChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.dessert) {
      setAlert("Veuillez remplir ce champ", "danger");
    } else {
      push("/step4");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h3 className="mb-3">What do you want for dessert?</h3>
      <Alerts />
      <h6>Step 3: Single Choice</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="tiramisu"
          id="checkbox1"
          checked={values.dessert === "tiramisu"}
          onChange={SingleCheckboxChange("dessert")}
        />
        <label className="form-check-label" htmlFor="checkbox1">
          Tiramisu
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="ice-cream"
          id="checkbox2"
          checked={values.dessert === "ice-cream"}
          onChange={SingleCheckboxChange("dessert")}
        />
        <label className="form-check-label" htmlFor="checkbox2">
          Ice cream
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="cake"
          id="checkbox3"
          checked={values.dessert === "cake"}
          onChange={SingleCheckboxChange("dessert")}
        />
        <label className="form-check-label" htmlFor="checkbox3">
          Cake
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

export default Step3;
