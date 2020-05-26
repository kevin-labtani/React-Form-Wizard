import React from "react";
import AvatarQuestion from "./AvatarQuestion";

function Question({questionTitle}) {
  return (
    <div className="row">
      <AvatarQuestion />
      <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
        <h3>{questionTitle}</h3>
      </div>
    </div>
  );
}

export default Question;
