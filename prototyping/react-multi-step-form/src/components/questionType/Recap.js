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
    let answer = value;
    let question = questions.filter((q) => q.question_id === parseInt(key));
    if (question[0].question_type_id !== 1 && question[0].box_values) {
      let choice = question[0].box_values.filter((val) => val.id === value);
      answer = choice[0].label;
    }
    list.push(
      <li key={key} className="list-group-item">
        {question[0].question_name} : {answer}
      </li>
    );
  }

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <ul className="list-group">{list}</ul>
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
        Submit
      </button>
    </div>
  );
};

export default Recap;
