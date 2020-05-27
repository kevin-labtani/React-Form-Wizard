import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

import isEmail from "validator/lib/isEmail";

const Email = ({
  values,
  inputChange,
  questionTitle,
  questionSubtitle,
  questionId,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!isEmail(values[questionId])) {
      setAlert("Veuillez entrer une adresse email valide", "danger");
    } else {
      values[questionId] === "admin@demo.com" ? push("/step3") : push("/step2");
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
            <label htmlFor="email">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              id="email"
              onChange={inputChange(questionId)}
              value={values[questionId]}
              autoComplete="off"
              autoFocus
              placeholder="Enter your email here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Email.defaultProps = {
  questionTitle: "What's your email?",
  questionSubtitle: "Step 1: email",
  questionId: 1,
};

export default Email;
