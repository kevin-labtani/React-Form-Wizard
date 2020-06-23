import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import {
  containerVariants,
  answerVariants,
  KeyboardNavVariants,
} from "../../AnimationConstant";

import isMobilePhone from "validator/lib/isMobilePhone";

const PhoneNumber = ({ values, inputChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_optional: questionOptional,
    question_id: questionId,
    default_next_id: nextQuestionId,
  } = data;

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (
      (!questionOptional && !isMobilePhone(values[questionId])) ||
      (questionOptional &&
        values[questionId] &&
        !isMobilePhone(values[questionId]))
    ) {
      setAlert("Veuillez entrer un numéro de téléphone valide", "danger");
    } else {
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
        questionOptional={questionOptional}
      />

      <motion.div className="row" variants={answerVariants}>
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="phone">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="tel"
              className="form-control form-control-lg"
              name="phone"
              id="phone"
              maxLength="25"
              onKeyDown={handleKeyDown}
              onChange={inputChange(questionId)}
              value={values[questionId]}
              autoComplete="off"
              autoFocus
              placeholder="Enter your phone number here"
            />
          </div>
          {values[questionId] && (
            <motion.p className="mb-0" variants={KeyboardNavVariants}>
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

export default PhoneNumber;
