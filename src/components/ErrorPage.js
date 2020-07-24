import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../AnimationConstant";

const ErrorPage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-hu-grey">
      <div className="container my-auto">
        <motion.div
          className="jumbotron bg-hu-grey-1 text-center mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h1 className="mb-3">Hike Up Wizard</h1>
          <p className="lead">Sorry, there was an error accessing our API</p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
