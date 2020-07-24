import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import {
  containerVariants,
  answerVariants,
  keyboardNavVariants,
} from "../../AnimationConstant";
import { mobile } from "../../browserData";

const Number = ({ answers, inputChange, updateTimerLocation, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
    avatar_answer: avatarAnswer,
    avatar_question: avatarQuestion,
    parameters,
  } = data;

  let min, max;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "max_value") max = parseInt(param.value);
      if (param.name === "min_value") min = parseInt(param.value);
    });

  const [startTimer] = useState(new Date().getTime());

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    if (
      (questionRequired &&
        (!answers[questionId] ||
          answers[questionId] < min ||
          answers[questionId] > max)) ||
      (!questionRequired &&
        answers[questionId] &&
        (answers[questionId] < min || answers[questionId] > max))
    ) {
      setAlert(`${config.alert_number_validity} ${min} & ${max}`, "danger");
    } else {
      updateTimerLocation(
        questionId,
        nextQuestionId,
        nextQuestionId,
        (new Date().getTime() - startTimer) / 1000
      );
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    goBack();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fwd(event);
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
        avatarQuestion={avatarQuestion}
      />

      <motion.div className="row" variants={answerVariants}>
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="number">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="number"
              id="number"
              onKeyDown={handleKeyDown}
              onChange={inputChange(questionId)}
              value={answers[questionId]}
              min={min}
              max={max}
              autoFocus={!mobile}
              placeholder={config.placeholder_number}
            />
          </div>
          {answers[questionId] && (
            <motion.p className="mb-0" variants={keyboardNavVariants}>
              {config.keyboard_nav}
            </motion.p>
          )}
        </div>
        <AvatarAnswer avatarAnswer={avatarAnswer} />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default Number;
