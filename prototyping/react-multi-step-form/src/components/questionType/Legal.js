import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import AvatarAnswer from "../AvatarAnswer";
import Question from "../Question";
import Navigation from "../Navigation";

const Legal = ({
  values,
  SingleCheckboxChangePush,
  questionTitle,
  questionSubtitle,
  questionId,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values[questionId]) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step5");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  // alternative way to auto push to next step
  // const checkboxChangePush = (e) => {
  //   checkboxChange("contactCheck")(e);
  //   cont(e);
  // };

  return (
    <>
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">{questionSubtitle}</p>
          <div className="form-group">
            <div className="form-check pl-0 col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="yes"
                id="checkbox1"
                checked={values[questionId] === "yes"}
                onChange={SingleCheckboxChangePush(questionId, "/step5")}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values[questionId] === "yes" ? "active" : ""
                }`}
                htmlFor="checkbox1"
              >
                Yes
              </label>
            </div>
            <div className="form-check pl-0 col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="no"
                id="checkbox2"
                checked={values[questionId] === "no"}
                onChange={SingleCheckboxChangePush(questionId, "/step5")}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values[questionId] === "no" ? "active" : ""
                }`}
                htmlFor="checkbox2"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Legal.defaultProps = {
  questionTitle: "Can we send you emails?",
  questionSubtitle: "Step 4: legal",
  questionId: 4,
};

export default Legal;
