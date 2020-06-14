import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import { containerVariants } from "../../AnimationConstant";

const Number = ({ values, inputChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  let min, max;
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
      !values[questionId] ||
      values[questionId] < min ||
      values[questionId] > max
    ) {
      setAlert(`Please enter a number between ${min} and ${max}`, "danger");
    } else {
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Question questionTitle={questionTitle} />

      <div className="row">
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
              onChange={inputChange(questionId)}
              value={values[questionId]}
              min={min}
              max={max}
              autoFocus
              placeholder="Enter a value here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default Number;
