import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step8 = ({
  values,
  multiCheckboxChange,
  questionTitle,
  questionSubtitle,
  questionId,
  answerArray,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (values[questionId].length === 0) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step9");
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
          <p className="subtitles text-muted">{questionSubtitle}</p>
          {answerArray.map((choice, index) => (
            <div className="form-check pl-0" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={`${choice}`}
                id={`checkbox-${index}`}
                checked={values[questionId].includes(`${choice}`)}
                onChange={multiCheckboxChange(questionId)}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values[questionId].includes(`${choice}`) ? "active" : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {choice}
              </label>
            </div>
          ))}
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step8.defaultProps = {
  questionTitle: "What is your favorite pet?",
  questionSubtitle: "Step 8: multiple choice",
  questionId: 8,
  answerArray: ["cat", "dog", "fish"],
};

export default Step8;
