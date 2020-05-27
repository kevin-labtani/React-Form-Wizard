import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step3 = ({
  values,
  SingleCheckboxChange,
  questionTitle,
  questionSubtitle,
  answerArray,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values.dessert) {
      setAlert("Veuillez remplir ce champ", "danger");
    } else {
      push("/step4");
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
          <p className="subtitles text-muted">{questionSubtitle}</p>
          {answerArray.map((choice, index) => (
            <div className="form-check pl-0" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={`${choice}`}
                id={`checkbox-${index}`}
                checked={values.dessert === `${choice}`}
                onChange={SingleCheckboxChange("dessert")}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values.dessert === `${choice}` ? "active" : ""
                }`}
                htmlFor={`checkbox-${index}`}
              >
                {choice}
              </label>
            </div>
          ))}
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step3.defaultProps = {
  questionTitle: "What do you want for dessert?",
  questionSubtitle: "Step 3: single choice",
  answerArray: ["tiramisu", "ice-cream", "cake", "tarte aux pommes"],
};

export default Step3;
