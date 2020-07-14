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

const OpinionScale = ({
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
    parameters,
  } = data;

  let labelLeft, labelRight;
  parameters &&
    parameters.forEach((param) => {
      if (param.name === "label_left") {
        labelLeft = param.value;
      }
      if (param.name === "label_right") {
        labelRight = param.value;
      }
    });

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
          <div className="form-group">
            <ul className="pagination">
              <li className="page-item disabled">
                <input type="checkbox" id="rating-left" hidden />
                <label className="page-link" htmlFor="rating-left">
                  {labelLeft}
                </label>
              </li>
              {boxValues.map((choice, index) => (
                <li
                  className={`page-item ${
                    answers[questionId] === `*${choice.id}` ? "active" : ""
                  }`}
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="rating"
                    value={`${choice.id}`}
                    id={`rating-${index}`}
                    checked={answers[questionId] === `*${choice.id}`}
                    onChange={(e) =>
                      changeHandler(choice.next_id_if_selected, e)
                    }
                    hidden
                  />
                  <label
                    className={`page-link ${
                      answers[questionId] === `*${choice.id}`
                        ? "animate-label"
                        : ""
                    }`}
                    htmlFor={`rating-${index}`}
                  >
                    {choice.label}
                  </label>
                </li>
              ))}
              <li className="page-item disabled">
                <input type="checkbox" id="rating-right" hidden />
                <label className="page-link" htmlFor="rating-right">
                  {labelRight}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default OpinionScale;
