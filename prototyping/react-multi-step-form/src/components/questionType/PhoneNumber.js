import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const PhoneNumber = ({ values, inputChange, data, totalQuestions }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
  } = data;

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  let nextQuestion = questionId + 1;
  if (questionId === totalQuestions - 2) {
    nextQuestion = "thankyou";
  }

  const fwd = (e) => {
    e.preventDefault();
    if (values[questionId] === "") {
      setAlert("Veuillez remplir ce champ", "danger");
    } else if (values[questionId].length > 256) {
      setAlert("Votre réponse doit faire moins de 256 caractères", "danger");
    } else {
      push(`/${nextQuestion}`);
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
          <div className="form-group">
            <label htmlFor="phone">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="tel"
              className="form-control form-control-lg"
              name="phone"
              id="phone"
              maxLength="256"
              onChange={inputChange(questionId)}
              value={values[questionId]}
              autoComplete="off"
              autoFocus
              placeholder="Enter your phone number here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

export default PhoneNumber;
