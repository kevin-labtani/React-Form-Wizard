import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const YesNo = ({ values, SingleCheckboxChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
    box_values: boxValues,
  } = data;

  let nextQuestionId = questionId + 1;
  if (values[questionId]) {
    let selected = boxValues.find((q) => q["id"] === values[questionId]);
    if (selected["next_id_if_selected"]) {
      nextQuestionId = selected["next_id_if_selected"];
    }
  }

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push(`/${nextQuestionId}`);
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
          {boxValues.map((choice, index) => (
            <div key={index} className="form-check pl-0">
              <input
                className="form-check-input"
                type="checkbox"
                value={`${choice["id"]}`}
                id={`checkbox-${index}`}
                checked={values[questionId] === `${choice["id"]}`}
                onChange={SingleCheckboxChange(questionId)}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values[questionId] === `${choice["id"]}` ? "active" : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {choice["label"]}
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

export default YesNo;
