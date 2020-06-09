import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";
import axios from "axios";

const FileUpload = ({ values, inputChange, data }) => {
  const {
    question_name: questionTitle,
    question_subtitle: questionSubtitle,
    question_id: questionId,
    default_next_id: nextQuestionId,
  } = data;

  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const [file, setFile] = useState("");

  const fwd = (e) => {
    e.preventDefault();
    if (values[questionId] === "") {
      setAlert("Veuillez choisir un fichier a uploader", "danger");
    } else {
      push(`/${nextQuestionId}`);
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  const selectHandler = (e) => {
    setFile(e.target.files[0]);
    inputChange(questionId)(e);
  };

  const uploadHandler = (e) => {
    const fd = new FormData();
    fd.append("image", file, file.name);
    console.log(fd.get("image"));
    axios
      .post("my-domain.com/file-upload", fd, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%"
          );
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="custom-file">
            <label className="custom-file-label" htmlFor="file">
              {file ? file.name : "Choose file"}
            </label>
            <input
              type="file"
              className="custom-file-input form-control-lg"
              name="file"
              id="file"
              onChange={selectHandler}
            />
            <button className="btn btn-primary my-2" onClick={uploadHandler} disabled={!file}>
              Upload
            </button>
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

export default FileUpload;
