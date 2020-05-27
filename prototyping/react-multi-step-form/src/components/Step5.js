import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import Question from "./Question";
import Navigation from "./Navigation";

const Step5 = ({
  values,
  SingleCheckboxChange,
  questionTitle,
  opinionRange,
}) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (!values.opinion) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step6");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  // generate opinion scale
  const scale = [];
  for (let index = 1; index <= opinionRange; index++) {
    scale.push(
      <li
        className={`page-item ${values.opinion === `${index}` ? "active" : ""}`}
        key={index}
      >
        <input
          type="checkbox"
          name="rating"
          id={`rating-${index}`}
          value={`${index}`}
          checked={values.opinion === `${index}`}
          onChange={SingleCheckboxChange("opinion")}
          hidden
        />
        <label className="page-link" htmlFor={`rating-${index}`}>
          {index}
        </label>
      </li>
    );
  }

  return (
    <>
      <Question questionTitle={questionTitle} />

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <p className="subtitles text-muted">Step 5: opinion scale</p>
          <div className="form-group">
            <ul className="pagination">
              <li className="page-item disabled">
                <input type="checkbox" id="rating-left" hidden />
                <label className="page-link" htmlFor="rating-left">
                  -
                </label>
              </li>
              {scale}
              <li className="page-item disabled">
                <input type="checkbox" id="rating-right" hidden />
                <label className="page-link" htmlFor="rating-right">
                  +
                </label>
              </li>
            </ul>
          </div>
        </div>
        <AvatarAnswer />
      </div>

      <Navigation fwd={fwd} back={back} />
    </>
  );
};

Step5.defaultProps = {
  questionTitle: "What is your opinion from 1 to 10?",
  opinionRange: 10,
};

export default Step5;
