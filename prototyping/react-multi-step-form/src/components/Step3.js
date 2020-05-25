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
      <div className="row">
        <div className="col-2 offset-1 col-lg-1 offset-lg-2 text-center align-self-center">
          {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
          <i className="fas fa-user-circle avatar" />
        </div>
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble">
          <h3>What do you want for dessert?</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-10 offset-1 col-lg-8 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1">
          <Alerts />
          <p className="subtitles text-muted">Step 3: Single Choice</p>
          <div className="form-check pl-0">
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
          <div className="form-check pl-0">
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
          <div className="form-check pl-0">
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
                <i className="fas fa-arrow-up" />
              </button>
            </div>
            <div className="col-6 text-right">
              <button className="btn btn-primary rounded-circle" onClick={cont}>
                <i className="fas fa-arrow-down" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
