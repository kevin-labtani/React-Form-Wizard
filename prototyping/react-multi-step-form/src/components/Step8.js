import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step8 = ({ values, multiCheckboxChange, questionTitle }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (values.pet.length === 0) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step9");
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
          <p className="subtitles text-muted">Step 8: multiple choice</p>
          <div className="form-check pl-0">
            <input
              className="form-check-input"
              type="checkbox"
              value="cat"
              id="checkbox1"
              checked={values.pet.includes("cat")}
              onChange={multiCheckboxChange("pet")}
              hidden
            />
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 ${
                values.pet.includes("cat") ? "active" : ""
              }`}
              htmlFor="checkbox1"
            >
              Cat
            </label>
          </div>
          <div className="form-check pl-0">
            <input
              className="form-check-input"
              type="checkbox"
              value="dog"
              id="checkbox2"
              checked={values.pet.includes("dog")}
              onChange={multiCheckboxChange("pet")}
              hidden
            />
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 ${
                values.pet.includes("dog") ? "active" : ""
              }`}
              htmlFor="checkbox2"
            >
              Dog
            </label>
          </div>
          <div className="form-check pl-0">
            <input
              className="form-check-input"
              type="checkbox"
              value="fish"
              id="checkbox3"
              checked={values.pet.includes("fish")}
              onChange={multiCheckboxChange("pet")}
              hidden
            />
            <label
              className={`btn btn-outline-primary btn-block text-left pl-4 ${
                values.pet.includes("fish") ? "active" : ""
              }`}
              htmlFor="checkbox3"
            >
              Fish
            </label>
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step8.defaultProps = {
  questionTitle: "What is your favorite pet?",
};

export default Step8;
