import React from "react";
import { motion } from "framer-motion";

const ThankYou = ({ data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
  } = data;

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
      className="jumbotron bg-hu-grey-1 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <img src={questionPicture} alt="" className="img-fluid d-block mx-auto" />
    </motion.div>
  );
};

export default ThankYou;
