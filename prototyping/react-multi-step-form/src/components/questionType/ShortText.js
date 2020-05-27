import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const ShortText = ({
  values,
  inputChange,
  questionTitle,
  questionSubtitle,
  questionId,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (values[questionId] === "") {
      setAlert("Veuillez remplir ce champ", "danger");
    } else if (values[questionId].length > 256) {
      setAlert("Votre réponse doit faire moins de 256 caractères", "danger");
    } else {
      push("/step3");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <>
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="name">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              id="name"
              maxLength="256"
              onChange={inputChange(questionId)}
              value={values[questionId]}
              autoComplete="off"
              autoFocus
              placeholder="Enter your name here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

ShortText.defaultProps = {
  questionTitle: "What's your name?",
  questionSubtitle: "Step 2: short text",
  questionId: 2,
};

export default ShortText;
