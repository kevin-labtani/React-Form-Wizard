import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = ({ data, initAnswerState }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    default_next_id: nextQuestionId,
  } = data;

  const { push } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    push(`/${nextQuestionId}`);
    initAnswerState();
  };

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
      className="jumbotron bg-hu-grey-1 text-center mb-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <img src={questionPicture} alt="" className="img-fluid d-block mx-auto" />
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
        Start
      </button>
    </motion.div>
  );
};

export default Welcome;
