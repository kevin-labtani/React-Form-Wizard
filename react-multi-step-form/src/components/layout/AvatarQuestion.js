import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function AvatarQuestion() {
  return (
    <div className="col-2 offset-1 col-lg-1 offset-lg-2 text-center align-self-center">
      {/* <img
            src="//placehold.it/300"
            alt=""
            className="rounded-circle img-fluid"
          /> */}
      <FontAwesomeIcon icon={faUserCircle} className="avatar" />
    </div>
  );
}

export default AvatarQuestion;
