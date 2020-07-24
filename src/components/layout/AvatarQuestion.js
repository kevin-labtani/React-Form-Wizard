import React from "react";

function AvatarQuestion({avatarQuestion}) {
  return (
    <div className="col-2 offset-1 col-lg-1 offset-lg-2 text-center align-self-center">
      <img src={avatarQuestion} alt="" className="rounded-circle img-fluid" />
    </div>
  );
}

export default AvatarQuestion;
