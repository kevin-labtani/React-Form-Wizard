import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import { containerVariants } from "../../AnimationConstant";

const Welcome = ({ data, lastLocation, initAnswerState }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    default_next_id: nextQuestionId,
  } = data;

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const { push } = useHistory();

  const fwd = (e) => {
    push(`/${nextQuestionId}`);
    initAnswerState();
  };

  const continueFromLast = (e) => {
    push(`/${lastLocation}`);
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
      {!lastLocation && (
        <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
          {config.button_start}
        </button>
      )}
      {lastLocation && (
        <div className="row">
          <div className="col-lg-3 offset-lg-2 col-10 offset-1">
            <button
              className="btn btn-primary btn-lg btn-block mt-3"
              onClick={continueFromLast}
            >
              {config.button_continue}
            </button>
          </div>
          <div className="col-lg-3 offset-lg-2 col-10 offset-1">
            <button
              className="btn btn-danger btn-lg btn-block mt-3"
              onClick={fwd}
            >
              {config.button_restart}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Welcome;
