import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const OpinionScale = ({ values, SingleCheckboxChangePush, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_optional: questionOptional,
    question_id: questionId,
    box_values: boxValues,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  let labelLeft, labelRight;
  parameters.forEach((param) => {
    if (param.name === "label_left") {
      labelLeft = param.value;
    }
    if (param.name === "label_right") {
      labelRight = param.value;
    }
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
    if (!questionOptional && !values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push(`/${nextQuestion}`);
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
      <Question
        questionTitle={questionTitle}
        questionPicture={questionPicture}
        questionOptional={questionOptional}
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
                    values[questionId] === `${choice.id}` ? "active" : ""
                  }`}
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="rating"
                    value={`${choice.id}`}
                    id={`rating-${index}`}
                    checked={values[questionId] === `${choice.id}`}
                    onChange={SingleCheckboxChangePush(
                      questionId,
                      nextQuestion,
                      choice.next_id_if_selected
                    )}
                    hidden
                  />
                  <label
                    className={`page-link ${
                      values[questionId] === `${choice.id}`
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
