import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants } from "../../AnimationConstant";

const Recap = ({ data, values, questions, sendAnswers }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    default_next_id: nextQuestionId,
  } = data;

  const { goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    sendAnswers(nextQuestionId);
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
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
    <motion.div
      className="jumbotron bg-hu-grey-1 text-center p-4 mt-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="mb-3">{questionTitle}</h1>
      <p className="lead">{questionSubtitle}</p>
      <ul className="list-group col-lg-10 mx-auto p-0">{list}</ul>
      <div className="row mt-3">
        <div className="col-lg-2 offset-lg-2 col-sm-4 offset-sm-1 col-6">
          <button className="btn btn-lg btn-danger btn-block" onClick={back}>
            Back
          </button>
        </div>
        <div className="col-lg-2 offset-lg-4 col-sm-4 offset-sm-2 col-6">
          <button className="btn btn-lg btn-primary btn-block" onClick={fwd}>
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Recap;
