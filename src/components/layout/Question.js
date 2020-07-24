import React from "react";
import AvatarQuestion from "./AvatarQuestion";
import { motion } from "framer-motion";
import { questionVariants } from "../../AnimationConstant";

function Question({
  questionTitle,
  questionPicture,
  questionRequired,
  avatarQuestion,
}) {
  return (
    <motion.div
      className="row"
      variants={questionVariants}
      initial="hidden"
      animate="visible"
    >
      <AvatarQuestion avatarQuestion={avatarQuestion} />
      <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
        <h3>{questionRequired ? questionTitle + " *" : questionTitle}</h3>
        {questionPicture && (
          <img
            src={questionPicture}
            className="img-fluid rounded "
            alt="question"
          />
        )}
      </div>
    </motion.div>
  );
}

export default Question;
