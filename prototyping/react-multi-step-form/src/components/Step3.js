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
    <>
      <h3 className="mb-3">What do you want for dessert?</h3>
      <Alerts />
      <p className="subtitles text-muted">Step 3: Single Choice</p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="tiramisu"
          id="checkbox1"
          checked={values.dessert === "tiramisu"}
          onChange={SingleCheckboxChange("dessert")}
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.dessert === "tiramisu" ? "active" : ""
          }`}
          htmlFor="checkbox1"
        >
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
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.dessert === "ice-cream" ? "active" : ""
          }`}
          htmlFor="checkbox2"
        >
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
          hidden
        />
        <label
          className={`btn btn-outline-primary btn-block text-left pl-4 ${
            values.dessert === "cake" ? "active" : ""
          }`}
          htmlFor="checkbox3"
        >
          Cake Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Molestias, odit? Reprehenderit, tempore.
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

export default Step3;
