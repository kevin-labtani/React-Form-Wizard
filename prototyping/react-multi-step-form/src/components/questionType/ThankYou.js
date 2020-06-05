import React from "react";

const ThankYou = ({ data }) => {
    const {
      question_name: questionTitle,
      question_subtitle: questionSubtitle,
      question_picture: questionPicture,
    } = data;

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <img src={questionPicture} alt="" className="img-fluid d-block mx-auto" />
    </div>
  );
};

export default ThankYou;
