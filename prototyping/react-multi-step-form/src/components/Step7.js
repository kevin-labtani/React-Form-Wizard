import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step7 = ({ values, inputChange, questionTitle, questionSubtitle }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values.number || values.number < 0 || values.number > 10) {
      setAlert("Please enter a number between 0 and 10", "danger");
    } else {
      push("/step8");
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
            <label htmlFor="number">
              <p className="subtitles text-muted">{questionSubtitle}</p>
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              name="number"
              onChange={inputChange("number")}
              value={values.number}
              min={0}
              max={10}
              autoFocus
              placeholder="Enter a value here"
            />
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step7.defaultProps = {
  questionTitle: "Please pick a number between 1 and 10",
  questionSubtitle: "Step 7: number"
};

export default Step7;
