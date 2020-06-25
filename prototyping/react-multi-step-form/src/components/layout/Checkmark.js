import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Checkmark() {
  return (
    <span className="pr-3">
      <FontAwesomeIcon icon={faCheck} />
    </span>
  );
}

export default Checkmark;
