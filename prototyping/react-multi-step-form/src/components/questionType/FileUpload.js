import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import { containerVariants, answerVariants } from "../../AnimationConstant";

const FileUpload = ({ values, inputChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_picture: questionPicture,
    question_required: questionRequired,
    question_id: questionId,
    default_next_id: nextQuestionId,
  } = data;

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const fwd = (e) => {
    e.preventDefault();
    if (questionRequired && !values[questionId]) {
      setAlert("Veuillez choisir un fichier à uploader", "danger");
    } else {
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    inputChange(questionId)(e);
  };

  const uploadHandler = async (e) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    // console.log(fd.get("file"));
    try {
      await axios.post("my-domain.com/file-upload", fd, {
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
      });
    } catch (err) {
      if (err.response.status >= 400) {
        setAlert("There was a problem while uploading the file", "danger");
        setUploadPercentage(0);
      } else {
        setAlert("The file was uploaded", "success");
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
      />

      <motion.div className="row" variants={answerVariants}>
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="custom-file">
            <label className="custom-file-label" htmlFor="file">
              {file ? file.name : "Choose file"}
            </label>
            <input
              type="file"
              className="custom-file-input"
              name="file"
              id="file"
              onChange={changeHandler}
              accept=""
            />
          </div>
          <div className="row pt-2">
            <div className="col-5 col-lg-2 col-md-3">
              <button
                className="btn btn-primary"
                onClick={uploadHandler}
                disabled={!file}
              >
                Upload
              </button>
            </div>
            <div className="col-7 col-lg-10 col-md-9 my-auto">
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
        <AvatarAnswer />
      </motion.div>

      <Navigation fwd={fwd} back={back} />
    </motion.div>
  );
};

export default FileUpload;
