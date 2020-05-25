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
      <div className="row">
        <div className="col-2 offset-1 col-lg-1 offset-lg-2 text-center align-self-center">
          {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
          <i className="fas fa-user-circle avatar" />
        </div>
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
          <h3>Please pick a number between 1 and 10</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
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
        </div>
        <div className="col-2 col-lg-1 text-center align-self-center">
          {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
          <i className="fas fa-user-circle avatar" />
        </div>
      </div>
      <div className="row">
        <div className="col-10 offset-1 col-lg-8 offset-lg-2 my-3">
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

export default Step2;
