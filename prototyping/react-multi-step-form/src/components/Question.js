import React from "react";
import AvatarQuestion from "./AvatarQuestion";
import { motion } from "framer-motion";
import { questionVariants } from "../AnimationConstant";

function Question({ questionTitle }) {
  return (
    <motion.div
      className="row"
      variants={questionVariants}
      initial="hidden"
      animate="visible"
    >
      <AvatarQuestion />
      <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
        <h3>{questionTitle}</h3>
      </div>
    </motion.div>
  );
}

export default Question;
