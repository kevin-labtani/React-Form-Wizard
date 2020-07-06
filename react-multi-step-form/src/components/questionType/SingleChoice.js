import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import Checkmark from "../layout/Checkmark";
import {
  containerVariants,
  answerVariants,
  keyboardNavVariants,
} from "../../AnimationConstant";

const SingleChoice = ({
  values,
  singleCheckboxChangePush,
  inputChange,
  updateTimerLocation,
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

  const [startTimer] = useState(new Date().getTime());
  const [freeTextInput, setfreeTextInput] = useState(false);
  const [freeTextInputAnimate, setfreeTextInputAnimate] = useState(false);
  const [freeText, setFreeText] = useState(
    values[questionId] && !values[questionId].startsWith("*")
      ? values[questionId]
      : ""
  );

  let freeTextOption = false;
  let pictureOption = false;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "other") freeTextOption = true;
      if (param.name === "picture") pictureOption = true;
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
      updateTimerLocation(
        questionId,
        nextQuestionId,
        (new Date().getTime() - startTimer) / 1000
      );
      push(`/${nextQuestion}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  const changeHandler = (routingId, e) => {
    updateTimerLocation(
      questionId,
      nextQuestionId,
      (new Date().getTime() - startTimer) / 1000
    );
    singleCheckboxChangePush(questionId, nextQuestion, routingId)(e);
  };

  const submitFreeText = (event) => {
    setfreeTextInput(false);
    inputChange(questionId)(event);
    if (freeText) {
      setfreeTextInputAnimate(true);
      setTimeout(() => {
        updateTimerLocation(
          questionId,
          nextQuestionId,
          (new Date().getTime() - startTimer) / 1000
        );
        push(`/${nextQuestion}`);
      }, 1200);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitFreeText(event);
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
                checked={values[questionId] === `*${choice.id}`}
                onChange={(e) => changeHandler(choice.next_id_if_selected, e)}
                hidden
              />
              <label
                className={`btn btn-outline-primary  text-left btn-block ${
                  pictureOption ? "px-4 pt-3" : "pl-4"
                } ${
                  values[questionId] === `*${choice.id}`
                    ? "active animate-label"
                    : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {pictureOption && (
                  <img
                    src={choice.picture}
                    alt=""
                    className="img-fluid rounded d-block mx-auto"
                  />
                )}
                {values[questionId] === `*${choice.id}` ? <Checkmark /> : ""}
                {choice.label}
              </label>
            </div>
          ))}
          {freeTextOption && (
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 
              ${
                freeTextInput ||
                (values[questionId] && !values[questionId].startsWith("*"))
                  ? "active"
                  : ""
              } 
              ${freeTextInputAnimate ? "animate-label" : ""}`}
              htmlFor={`checkbox-other`}
              onClick={() => {
                setfreeTextInput(true);
              }}
            >
              {values[questionId] &&
              !freeTextInput &&
              !values[questionId].startsWith("*") ? (
                <Checkmark />
              ) : (
                ""
              )}
              {(freeTextInput && (
                <input
                  type="text"
                  className="form-control"
                  name="shorttext"
                  id="shorttext"
                  maxLength="256"
                  autoComplete="off"
                  autoFocus
                  placeholder="Enter you answer here"
                  onChange={(e) => setFreeText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={freeText}
                  onBlur={() => {
                    setfreeTextInput(false);
                  }}
                />
              )) ||
                (values[questionId] &&
                  !values[questionId].startsWith("*") &&
                  values[questionId]) ||
                "Other"}
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
