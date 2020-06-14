import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const Rating = ({ values, inputChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
    default_next_id: nextQuestionId,
    parameters,
  } = data;

  let ratingRange;
  parameters.forEach((param) => {
    if (param.name === "steps") ratingRange = parseInt(param.value);
  });

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values[questionId]) {
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
          onChange={inputChange(questionId)}
        />
        <label htmlFor={`rating-${index}`}></label>
      </React.Fragment>
    );
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.25, duration: 1 },
    },
    exit: {
      y: "-100vh",
      transition: { ease: "easeIn" },
    },
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
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="rating">{range}</div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default Rating;
