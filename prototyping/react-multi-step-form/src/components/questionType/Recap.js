import React from "react";
import { useHistory } from "react-router-dom";

const Recap = ({ data, values, questions }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    default_next_id: nextQuestionId,
  } = data;

  const { push } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    push(`/${nextQuestionId}`);
  };

  const list = [];
  for (let [key, value] of Object.entries(values)) {
    list.push(
      <li key={key} className="list-group-item">
        {value}
      </li>
    );
  }

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <ul className="list-group">
        {list}
      </ul>
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
        Submit
      </button>
    </div>
  );
};

export default Recap;
