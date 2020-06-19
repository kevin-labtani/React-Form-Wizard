import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { footerVariants } from "../../AnimationConstant";

const Footer = ({ questions, loading, answers }) => {
  const location = useLocation();
  const currentLoc = location.pathname.slice(1);
  // eslint-disable-next-line
  const answered = Object.values(answers).filter((el) => el != false);

  const progress = (answered.length / (questions.length - 2)) * 100;

  if (loading || !Object.keys(answers).includes(currentLoc)) {
    return null;
  }

  return (
    <motion.footer
      className="footer bg-hu-grey"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container">
        <div className="row">
          <div className="col-5 offset-7 col-lg-4 offset-lg-8 mt-3 mb-3">
            <div className="text-white">{progress.toFixed(0)}%</div>
            <div
              className="progress progress-img"
              style={{
                height: "16px",
              }}
            >
              <div
                className="progress-bar progress-bar-img"
                role="progressbar"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
