import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import AvatarQuestion from "./AvatarQuestion";
import Navigation from "./Navigation";

const Step2 = ({ values, inputChange }) => {
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
      <div className="row">
        <AvatarQuestion />
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
          <h3>Please pick a number between 1 and 10</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="number">
              <p className="subtitles text-muted">Step 7: number</p>
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

export default Step2;
