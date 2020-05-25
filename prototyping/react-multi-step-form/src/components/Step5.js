import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step5 = ({ values, SingleCheckboxChange }) => {
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
          <h3>What is your opinion from 1 to 10?</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">Step 5: opinion scale</p>
          <div className="form-group">
            <ul className="pagination">
              <li className="page-item disabled">
                <input type="checkbox" id="rating-left" hidden />
                <label className="page-link" htmlFor="rating-left">
                  -
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "1" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-1"
                  value="1"
                  checked={values.opinion === "1"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-1">
                  1
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "2" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-2"
                  value="2"
                  checked={values.opinion === "2"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-2">
                  2
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "3" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-3"
                  value="3"
                  checked={values.opinion === "3"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-3">
                  3
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "4" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-4"
                  value="4"
                  checked={values.opinion === "4"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-4">
                  4
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "5" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-5"
                  value="5"
                  checked={values.opinion === "5"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-5">
                  5
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "6" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-6"
                  value="6"
                  checked={values.opinion === "6"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-6">
                  6
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "7" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-7"
                  value="7"
                  checked={values.opinion === "7"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-7">
                  7
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "8" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-8"
                  value="8"
                  checked={values.opinion === "8"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-8">
                  8
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "9" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-9"
                  value="9"
                  checked={values.opinion === "9"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-9">
                  9
                </label>
              </li>
              <li
                className={`page-item ${
                  values.opinion === "10" ? "active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="rating"
                  id="rating-10"
                  value="10"
                  checked={values.opinion === "10"}
                  onChange={SingleCheckboxChange("opinion")}
                  hidden
                />
                <label className="page-link" htmlFor="rating-10">
                  10
                </label>
              </li>
              <li className="page-item disabled">
                <input type="checkbox" id="rating-right" hidden />
                <label className="page-link" htmlFor="rating-right">
                  +
                </label>
              </li>
            </ul>
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

export default Step5;
