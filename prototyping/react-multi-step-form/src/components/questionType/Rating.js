import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const Rating = ({
  values,
  inputChange,
  questionTitle,
  questionSubtitle,
  questionId,
  ratingRange,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step10");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  // generate rating range
  const range = [];
  for (let index = ratingRange; index > 0; index--) {
    range.push(
      <React.Fragment key={index}>
        <input
          type="radio"
          name="rating"
          id={`rating-${index}`}
          value={`${index}`}
          checked={values[questionId] === `${index}`}
          onChange={inputChange(questionId)}
        />
        <label htmlFor={`rating-${index}`}></label>
      </React.Fragment>
    );
  }

  return (
    <>
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="rating">{range}</div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Rating.defaultProps = {
  questionTitle: "How many stars do you give us?",
  questionSubtitle: "Step 9: rating",
  questionId: 9,
  ratingRange: 10,
};

export default Rating;
