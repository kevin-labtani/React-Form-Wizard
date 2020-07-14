import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import TextareaAutosize from "react-textarea-autosize";
import {
  containerVariants,
  answerVariants,
  keyboardNavVariants,
} from "../../AnimationConstant";
import { mobile } from "../../browserData";

const LongText = ({ answers, inputChange, updateTimerLocation, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
  } = data;

  const [startTimer] = useState(new Date().getTime());

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {

    if (questionRequired && !answers[questionId]) {
      setAlert(config.alert_empty_field, "danger");
    } else if (answers[questionId] && answers[questionId].length > 256) {
      setAlert(config.alert_max_input_size, "danger");
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

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
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
            <label htmlFor="textarea">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <TextareaAutosize
              className="form-control form-control-lg"
              name="textarea"
              id="textarea"
              maxLength="256"
              onKeyDown={handleKeyDown}
              onChange={inputChange(questionId)}
              value={answers[questionId]}
              autoComplete="off"
              autoFocus={!mobile}
              placeholder={config.placeholder_long_text}
              minRows="1"
            />
          </div>
          {answers[questionId] && (
            <motion.div className="mb-0" variants={keyboardNavVariants}>
              {!mobile && (
                <p className="mb-0">{config.keyboard_nav_new_line}</p>
              )}
              <p className="mb-0">{config.keyboard_nav}</p>
            </motion.div>
          )}
        </div>
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default LongText;
