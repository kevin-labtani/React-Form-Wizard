import React from "react";

function AvatarAnswer({ avatarAnswer }) {
  return (
    <div className="col-2 col-lg-1 text-center align-self-center">
      <img src={avatarAnswer} alt="" className="rounded-circle img-fluid" />
    </div>
  );
}

export default AvatarAnswer;
