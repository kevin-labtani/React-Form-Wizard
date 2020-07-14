import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const Rating = ({ answers, inputChangePush, updateTimerLocation, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  let ratingRange;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "steps") ratingRange = parseInt(param.value);
    });

  const [startTimer] = useState(new Date().getTime());

  const [animation, setAnimation] = useState(false);

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    if (questionRequired && !answers[questionId]) {
      setAlert(config.alert_choice, "danger");
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
    goBack();
  };

  const handleChange = (e) => {
    updateTimerLocation(
      questionId,
      nextQuestionId,
      (new Date().getTime() - startTimer) / 1000
    );
    inputChangePush(questionId, nextQuestionId)(e);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  // generate rating range
  const range = [];
  for (let index = ratingRange; index > 0; index--) {
    range.push(
      <React.Fragment key={index}>
        <input
          type="radio"
          name="rating"
          id={`rating-${index}`}
          value={`${index}`}
          checked={answers[questionId] === `${index}`}
          onChange={handleChange}
        />
        <label
          htmlFor={`rating-${index}`}
          className={animation ? "animate-label" : ""}
        ></label>
      </React.Fragment>
    );
  }

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
          <div className="rating">{range}</div>
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default Rating;
