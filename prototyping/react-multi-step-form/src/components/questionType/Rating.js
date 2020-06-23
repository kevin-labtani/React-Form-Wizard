import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const Rating = ({ values, inputChangePush, data }) => {
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
  parameters && parameters.forEach((param) => {
    if (param.name === "steps") ratingRange = parseInt(param.value);
  });

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (questionRequired && !values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
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
          checked={values[questionId] === `${index}`}
          onChange={inputChangePush(questionId, nextQuestionId)}
        />
        <label
          htmlFor={`rating-${index}`}
          className={values[questionId] ? "animate-label" : ""}
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
