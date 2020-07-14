import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useConfig } from "../../context/config/ConfigState";
import { containerVariants } from "../../AnimationConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faInfoCircle,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { alertVariants } from "../../AnimationConstant";

const Recap = ({
  data,
  answers,
  questions,
  sendAnswer,
  uploading,
  errorUploading,
}) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    default_next_id: nextQuestionId,
    parameters,
  } = data;
  
  let questionTOSText, questionTOSLink;
  parameters &&
  parameters.forEach((param) => {
    if (param.name === "question_tos_text") questionTOSText = param.value;
    if (param.name === "question_tos_link") questionTOSLink = param.value;
  });
  
    // use custom hook to consume our state and destructure
    const [{ config }] = useConfig();
  
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { push } = useHistory();

  const fwd = (e) => {
    sendAnswer(nextQuestionId);
  };

  const changeAnswer = (questionId, e) => {
    push(`/${questionId}`);
  };

  const list = [];
  for (let [key, value] of Object.entries(answers)) {
    let answer = value || (
      <span className="text-danger">
        <FontAwesomeIcon icon={faTimes} />
      </span>
    );
    let question = questions.filter((q) => q.question_id === parseInt(key));
    // handle FileUpload
    if (question[0].question_type_id === 13 && value) {
      answer = (
        <span className="text-primary">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      );
    }
    // handle any "choice" type question with a box_values
    if (question[0].box_values) {
      if (question[0].question_type_id !== 1) {
        let choice = question[0].box_values.filter(
          (val) => val.id === value.substr(1)
        );
        if (choice[0]) {
          answer = choice[0].label;
        }
      }
      // handle multipleChoice
      if (question[0].question_type_id === 1) {
        answer = "";
        value.forEach((element) => {
          let choice = question[0].box_values.filter(
            (val) => val.id === element.substr(1)
          );
          if (choice[0]) {
            answer += choice[0].label + ", ";
          }
          if (element.startsWith("$")) {
            answer += element.substr(1) + ", ";
          }
        });
        answer = answer.substring(0, answer.lastIndexOf(","));
        if (answer.length === 0) {
          answer = (
            <span className="text-danger">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          );
        }
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
        <label
          className="custom-control-label text-left"
          htmlFor="customCheck1"
        >
          {questionTOSText}
          <a
            href={questionTOSLink}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            {config.terms_conditions}
          </a>
        </label>
      </div>
      {errorUploading && (
        <motion.div
          className="alert alert-danger col-lg-10 mx-auto my-3"
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <FontAwesomeIcon icon={faInfoCircle} /> {config.submit_error}
        </motion.div>
      )}
      <button
        className="btn btn-primary btn-lg px-5 mt-3"
        onClick={fwd}
        disabled={!acceptTerms || uploading}
      >
        {!uploading && config.button_submit}
        {uploading && (
          <div className="spinner-border text-hu-grey-1 m-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </motion.div>
  );
};

export default Recap;
