import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import Checkmark from "../../Checkmark";
import {
  containerVariants,
  answerVariants,
  keyboardNavVariants,
} from "../../AnimationConstant";

const SingleChoice = ({
  values,
  SingleCheckboxChangePush,
  inputChange,
  data,
}) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    box_values: boxValues,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  boxValues.sort((a, b) => a.id - b.id);

  const [freeTextInput, setfreeTextInput] = useState(false);
  const [freeTextInputAnimate, setfreeTextInputAnimate] = useState(false);
  const [freeText, setFreeText] = useState(
    isNaN(values[questionId]) ? values[questionId] : ""
  );

  let freeTextOption = false;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "Other") freeTextOption = true;
    });

  let nextQuestion = nextQuestionId;
  if (Number.isInteger(parseInt(values[questionId]))) {
    let selected = boxValues.find((q) => q.id === values[questionId]);
    if (selected && selected.next_id_if_selected) {
      nextQuestion = selected.next_id_if_selected;
    }
  }

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (questionRequired && !values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push(`/${nextQuestion}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!freeText || isNaN(freeText)) {
        setfreeTextInput(false);
        inputChange(questionId)(event);
        if (isNaN(freeText)) {
          setfreeTextInputAnimate(true);
          setTimeout(() => {
            push(`/${nextQuestion}`);
          }, 1200);
        }
      } else {
        event.preventDefault();
        setAlert("Veuillez introduire votre choix (pas de nombres)", "danger");
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Question
        questionTitle={questionTitle}
        questionPicture={questionPicture}
        questionRequired={questionRequired}
      />

      <motion.div className="row" variants={answerVariants}>
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          {boxValues.map((choice, index) => (
            <div key={index} className="form-check pl-0">
              <input
                className="form-check-input"
                type="checkbox"
                value={`${choice.id}`}
                id={`checkbox-${index}`}
                checked={values[questionId] === `${choice.id}`}
                onChange={SingleCheckboxChangePush(
                  questionId,
                  nextQuestionId,
                  choice.next_id_if_selected
                )}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values[questionId] === `${choice.id}`
                    ? "active animate-label"
                    : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {choice.label}
                {values[questionId] === choice.id ? <Checkmark /> : ""}
              </label>
            </div>
          ))}
          {freeTextOption && (
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 
              ${freeTextInput || isNaN(values[questionId]) ? "active" : ""} 
              ${freeTextInputAnimate ? "animate-label" : ""}`}
              htmlFor={`checkbox-other`}
              onClick={() => {
                setfreeTextInput(true);
              }}
            >
              {(freeTextInput && (
                <input
                  type="text"
                  className="form-control"
                  name="shorttext"
                  id="shorttext"
                  maxLength="256"
                  autoComplete="off"
                  autoFocus
                  placeholder="Enter you choice here"
                  onChange={(e) => setFreeText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={freeText}
                  onBlur={() => {
                    setfreeTextInput(false);
                  }}
                />
              )) ||
                (isNaN(values[questionId]) && values[questionId]) ||
                "Other"}
              {isNaN(values[questionId]) && values[questionId] ? (
                <Checkmark />
              ) : (
                ""
              )}
            </label>
          )}
          {freeTextInput && (
            <motion.p className="mb-0" variants={keyboardNavVariants}>
              press Enter ↵ to validate
            </motion.p>
          )}
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default SingleChoice;
