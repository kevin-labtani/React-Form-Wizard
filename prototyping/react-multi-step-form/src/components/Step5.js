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
      <h3 className="mb-3">What is your opinion from 1 to 10?</h3>
      <Alerts />
      <p className="subtitles text-muted">Step 5: opinion scale</p>
      <div className="form-group">
        <ul className="pagination">
          <li className={`page-item ${values.opinion === "1" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "2" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "3" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "4" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "5" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "6" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "7" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "8" ? "active" : ""}`}>
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
          <li className={`page-item ${values.opinion === "9" ? "active" : ""}`}>
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
            className={`page-item ${values.opinion === "10" ? "active" : ""}`}
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
        </ul>
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

export default Step5;
