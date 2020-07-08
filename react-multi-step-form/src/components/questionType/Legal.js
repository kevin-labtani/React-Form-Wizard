import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import Checkmark from "../layout/Checkmark";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const Legal = ({
  answers,
  singleCheckboxChangePush,
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
  } = data;

  let nextQuestion = nextQuestionId;
  if (Number.isInteger(parseInt(answers[questionId]))) {
    let selected = boxValues.find((q) => q.id === answers[questionId]);
    if (selected && selected.next_id_if_selected) {
      nextQuestion = selected.next_id_if_selected;
    }
  }

  const [startTimer] = useState(new Date().getTime());

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (questionRequired && !answers[questionId]) {
      setAlert(config.alert_choice, "danger");
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
                checked={answers[questionId] === `*${choice.id}`}
                onChange={(e) => changeHandler(choice.next_id_if_selected, e)}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  answers[questionId] === `*${choice.id}`
                    ? "active animate-label"
                    : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {answers[questionId] === `*${choice.id}` ? <Checkmark /> : ""}
                {choice.label}
              </label>
            </div>
          ))}
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default Legal;
