import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
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

const Number = ({ values, inputChange, updateTimerLocation, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  const [startTimer] = useState(new Date().getTime());

  let min, max;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "max_value") max = parseInt(param.value);
      if (param.name === "min_value") min = parseInt(param.value);
    });

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (
      (questionRequired &&
        (!values[questionId] ||
          values[questionId] < min ||
          values[questionId] > max)) ||
      (!questionRequired &&
        values[questionId] &&
        (values[questionId] < min || values[questionId] > max))
    ) {
      setAlert(`Veuillez entrer un nombre entre ${min} & ${max}`, "danger");
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
    e.preventDefault();
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
              value={values[questionId]}
              min={min}
              max={max}
              autoFocus
              placeholder="Enter a value here"
            />
          </div>
          {values[questionId] && (
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

export default Number;
