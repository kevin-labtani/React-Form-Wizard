import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

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
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 9: rating</h1>
      <h3>How many stars do you rate us?</h3>
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

export default Step9;
