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
    if (question[0].box_values) {
      if (question[0].question_type_id !== 1) {
        let choice = question[0].box_values.filter((val) => val.id === value);
        if (choice[0]) {
          answer = choice[0].label;
        }
      }
      if (question[0].question_type_id === 1) {
        answer = "";
        value.forEach((element) => {
          let choice = question[0].box_values.filter(
            (val) => val.id === element
          );
          if (choice[0]) {
            answer += choice[0].label + ", ";
          }
        });
        answer = answer.substring(0, answer.lastIndexOf(","));
      }
    }
    list.push(
      <li key={key} className="list-group-item">
        <p className="font-weight-bold my-1">{question[0].question_name}</p>
        <p className="my-1">{answer}</p>
      </li>
    );
  }

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <ul className="list-group col-lg-10 mx-auto">{list}</ul>
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd}>
        Submit
      </button>
    </div>
  );
};

export default Recap;
