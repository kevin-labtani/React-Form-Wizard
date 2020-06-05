import React from "react";
import { useHistory } from "react-router-dom";

const Welcome = ({ data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    default_next_id: nextQuestionId,
  } = data;

  const { push } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    push(`/${nextQuestionId}`);
  };

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <img src={questionPicture} alt="" className="img-fluid d-block mx-auto" />
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
        Start
      </button>
    </div>
  );
};

export default Welcome;
