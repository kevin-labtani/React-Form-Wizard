import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants } from "../../AnimationConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Recap = ({ data, answers, questions, sendAnswers }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    default_next_id: nextQuestionId,
  } = data;

  const [acceptTerms, setAcceptTerms] = useState(false)

  const { push } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    sendAnswers(nextQuestionId);
  };

  const changeAnswer = (questionId, e) => {
    e.preventDefault();
    push(`/${questionId}`);
  };

  const list = [];
  for (let [key, value] of Object.entries(answers)) {
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
        <div className="row">
          <div className="col-10 offset-sm-1">
            <p className="font-weight-bold my-1">{question[0].question_name}</p>
            <p className="my-1">{answer}</p>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-danger btn-sm rounded-circle"
              onClick={(e) => changeAnswer(key, e)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
        </div>
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
      <div className="custom-control custom-checkbox mt-3">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customCheck1"
          onChange={() => setAcceptTerms(!acceptTerms)}
          checked={acceptTerms}
        />
        <label className="custom-control-label" htmlFor="customCheck1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque,
          laborum:{" "}
          <a href="/" target="_blank" className="">
            Terms & Conditions
          </a>
        </label>
      </div>
      <button className="btn btn-primary btn-lg px-5 mt-3" onClick={fwd} disabled={!acceptTerms}>
        Submit
      </button>
    </motion.div>
  );
};

export default Recap;
