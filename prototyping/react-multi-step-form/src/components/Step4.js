import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step4 = ({ values, SingleCheckboxChangePush, questionTitle }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values.contactCheck) {
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
          <p className="subtitles text-muted">Step 4: legal</p>
          <div className="form-group">
            <div className="form-check pl-0 col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="yes"
                id="checkbox1"
                checked={values.contactCheck === "yes"}
                onChange={SingleCheckboxChangePush("contactCheck", "/step5")}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values.contactCheck === "yes" ? "active" : ""
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
                checked={values.contactCheck === "no"}
                onChange={SingleCheckboxChangePush("contactCheck", "/step5")}
                hidden
              />
              <label
                className={`btn btn-outline-primary btn-block text-left pl-4 ${
                  values.contactCheck === "no" ? "active" : ""
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

Step4.defaultProps = {
  questionTitle: "Can we send you emails?",
};

export default Step4;
