import React, { useContext, useEffect, useCallback, useState } from "react";
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
import { mobile } from "../../browserData";

const MultipleChoice = ({
  answers,
  multiCheckboxChange,
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
    answers[questionId] && answers[questionId].filter((el) => isNaN(el))[0]
      ? answers[questionId].filter((el) => isNaN(el))[0].substr(1)
      : ""
  );

  let freeTextOption = false;
  let pictureOption = false;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "other" && param.value === "true")
        freeTextOption = true;
      if (param.name === "picture" && param.value === "true")
        pictureOption = true;
    });

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (questionRequired && answers[questionId].length === 0) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      updateTimerLocation(
        questionId,
        nextQuestionId,
        (new Date().getTime() - startTimer) / 1000
      );
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !freeTextInput) {
        fwd(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers[questionId], freeTextInput]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyDown, answers[questionId]]);

  const submitFreeText = (event) => {
    setfreeTextInput(false);
    if (event.target.value !== "") {
      event.target.value = "$" + event.target.value;
    }
    multiCheckboxChange(questionId)(event);
    if (freeText) {
      setfreeTextInputAnimate(true);
      setTimeout(() => {
        setfreeTextInputAnimate(false);
      }, 500);
    } else {
      setfreeTextInputAnimate(false);
    }
  };

  const handleKeyDownInput = (event) => {
    if (event.key === "Enter") {
      submitFreeText(event);
    }
  };

  const freeTextValue =
    answers[questionId] &&
    answers[questionId].filter((el) => el.startsWith("$"))[0];
  const freeTextLabel = freeTextValue && freeTextValue.substr(1);

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
                checked={
                  answers[questionId] &&
                  answers[questionId].includes(`*${choice.id}`)
                }
                onChange={multiCheckboxChange(questionId)}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left ${
                  pictureOption ? "px-4 pt-3" : "pl-4"
                } ${
                  answers[questionId] &&
                  answers[questionId].includes(`*${choice.id}`)
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
                {answers[questionId] &&
                answers[questionId].includes(`*${choice.id}`) ? (
                  <Checkmark />
                ) : (
                  ""
                )}
                {choice.label}
              </label>
            </div>
          ))}
          {freeTextOption && (
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 
              ${freeTextInput || freeTextLabel ? "active" : ""} 
              ${freeTextInputAnimate ? "animate-label" : ""}`}
              htmlFor={`checkbox-other`}
              onClick={() => {
                setfreeTextInput(true);
              }}
            >
              {freeTextLabel && !freeTextInput && answers[questionId] ? (
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
                  onKeyDown={handleKeyDownInput}
                  value={freeText}
                  onBlur={(e) => {
                    submitFreeText(e);
                  }}
                />
              )) ||
                freeTextLabel ||
                "Other"}
            </label>
          )}
          {freeTextInput && (
            <motion.p className="mb-0" variants={keyboardNavVariants}>
              press Enter ↵ to validate
            </motion.p>
          )}
          {/*eslint-disable-next-line eqeqeq*/}
          {answers[questionId] != false && !freeTextInput && !mobile && (
            <motion.p className="mb-0" variants={keyboardNavVariants}>
              press Enter ↵
            </motion.p>
          )}
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default MultipleChoice;
