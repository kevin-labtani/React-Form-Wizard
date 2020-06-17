import React from 'react'
import { motion } from "framer-motion";
import { navigationVariants } from "../AnimationConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Navigation({back, fwd}) {
  return (
    <motion.div
      className="row"
      variants={navigationVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="col-10 offset-1 col-lg-8 offset-lg-2 my-3">
        <div className="row">
          <div className="col-6">
            <button className="btn btn-danger rounded-circle" onClick={back}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-primary rounded-circle" onClick={fwd}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navigation
