import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useConfig } from "../../context/config/ConfigState";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../layout/AvatarAnswer";
import Question from "../layout/Question";
import Navigation from "../layout/Navigation";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const FileUpload = ({
  answers,
  fileUploadChange,
  updateTimerLocation,
  data,
}) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
    avatar_answer: avatarAnswer,
    avatar_question: avatarQuestion,
  } = data;

  const [startTimer] = useState(new Date().getTime());

  // use custom hook to consume our state and destructure
  const [{ config }] = useConfig();

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const fwd = (e) => {
    if (questionRequired && !answers[questionId]) {
      setAlert(config.alert_file_upload_choice, "danger");
    } else {
      updateTimerLocation(
        questionId,
        nextQuestionId,
        (new Date().getTime() - startTimer) / 1000
      );
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    goBack();
  };

  const uploadHandler = async (e) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    // console.log(fd.get("file"));
    try {
      let res = await axios.post(
        // add your url to the backend api
        "https://jsonplaceholder.typicode.com/posts",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );
      setAlert(config.alert_file_upload_success, "success");
      fileUploadChange(questionId)(res.data.uniqueName);
    } catch (err) {
      if (!err.response || err.response.status >= 400) {
        // console.log(err);
        setAlert(config.alert_file_upload_error, "danger");
        setUploadPercentage(0);
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Question
        questionTitle={questionTitle}
        questionPicture={questionPicture}
        questionRequired={questionRequired}
        avatarQuestion={avatarQuestion}
      />

      <motion.div className="row" variants={answerVariants}>
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="custom-file">
            <label className="custom-file-label" htmlFor="file">
              {file ? file.name : `${config.placeholder_file_upload}`}
            </label>
            <input
              type="file"
              className="custom-file-input"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=""
            />
          </div>
          <div className="row pt-2">
            <div className="col-5 col-md-3">
              <button
                className="btn btn-primary"
                onClick={uploadHandler}
                disabled={!file}
              >
                {config.button_upload}
              </button>
            </div>
            <div className="col-7 col-md-9 my-auto">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-green-hu"
                  role="progressbar"
                  style={{ width: `${uploadPercentage}%` }}
                >
                  {uploadPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <AvatarAnswer avatarAnswer={avatarAnswer} />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default FileUpload;
