import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step9 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.rating) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/confirm");
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
          <h3>How many stars do you give us?</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-10 offset-1 col-lg-8 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1">
          <Alerts />
          <p className="subtitles text-muted">Step 9: rating</p>
          <div className="rating">
            <input
              type="radio"
              name="rating"
              id="rating-5"
              value="5"
              checked={values.rating === "5"}
              onChange={inputChange("rating")}
            />
            <label htmlFor="rating-5"></label>
            <input
              type="radio"
              name="rating"
              id="rating-4"
              value="4"
              checked={values.rating === "4"}
              onChange={inputChange("rating")}
            />
            <label htmlFor="rating-4"></label>
            <input
              type="radio"
              name="rating"
              id="rating-3"
              value="3"
              checked={values.rating === "3"}
              onChange={inputChange("rating")}
            />
            <label htmlFor="rating-3"></label>
            <input
              type="radio"
              name="rating"
              id="rating-2"
              value="2"
              checked={values.rating === "2"}
              onChange={inputChange("rating")}
            />
            <label htmlFor="rating-2"></label>
            <input
              type="radio"
              name="rating"
              id="rating-1"
              value="1"
              checked={values.rating === "1"}
              onChange={inputChange("rating")}
            />
            <label htmlFor="rating-1"></label>
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
        </div>
      </div>
    </>
  );
};

export default Step9;
