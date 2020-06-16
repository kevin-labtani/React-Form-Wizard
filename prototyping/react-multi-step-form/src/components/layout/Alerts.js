import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { motion } from "framer-motion";
import { alertVariants } from "../../AnimationConstant";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <motion.div
        key={alert.id}
        className={`alert alert-${alert.type}`}
        variants={alertVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <i className="fas fa-info-circle" /> {alert.msg}
      </motion.div>
    ))
  );
};

export default Alerts;
