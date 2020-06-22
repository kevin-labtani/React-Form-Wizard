import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import Checkmark from "../../Checkmark";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const SingleChoice = ({ values, SingleCheckboxChangePush, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
    box_values: boxValues,
    default_next_id: nextQuestionId,
  } = data;

  boxValues.sort((a, b) => a.id - b.id);

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
    if (!values[questionId]) {
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
      <Question questionTitle={questionTitle} />

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
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default SingleChoice;
