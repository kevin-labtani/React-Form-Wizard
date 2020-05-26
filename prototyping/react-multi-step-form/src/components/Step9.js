import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step9 = ({ values, inputChange, questionTitle }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
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
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
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
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step9.defaultProps = {
  questionTitle: "How many stars do you give us?",
};

export default Step9;
