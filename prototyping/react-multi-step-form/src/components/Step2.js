import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";
import AvatarAnswer from "./AvatarAnswer";
import AvatarQuestion from "./AvatarQuestion";
import Navigation from "./Navigation";

const Step2 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    if (values.name === "") {
      setAlert("Veuillez remplir ce champ", "danger");
    } else if (values.name.length > 256) {
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
      <div className="row">
        <AvatarQuestion />
        <div className="col-8 col-lg-7 rounded-lg px-lg-4 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-question">
          <h3>What's your name?</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-8 offset-1 col-lg-7 offset-lg-2 rounded-lg px-lg-5 py-4 my-2 shadow bg-hu-grey-1 speech-bubble-answer">
          <Alerts />
          <div className="form-group">
            <label htmlFor="name">
              <p className="subtitles text-muted">Step 2: short text</p>
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              maxLength="256"
              onChange={inputChange("name")}
              value={values.name}
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

export default Step2;
