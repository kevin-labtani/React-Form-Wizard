import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Checkmark() {
  return (
    <span className="pr-lg-3 pr-2">
      <FontAwesomeIcon icon={faCheck} />
    </span>
  );
}

export default Checkmark;
