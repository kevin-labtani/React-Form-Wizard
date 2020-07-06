import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function AvatarAnswer() {
  return (
    <div className="col-2 col-lg-1 text-center align-self-center">
      {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
      <FontAwesomeIcon icon={faUserCircle} className="avatar" />
    </div>
  );
}

export default AvatarAnswer;
