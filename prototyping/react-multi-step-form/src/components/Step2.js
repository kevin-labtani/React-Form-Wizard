import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

const Step2 = ({ values, inputChange }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
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
    <div className="form-container">
      <h3 className="mb-3">What's your name?</h3>
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

      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger rounded-circle" onClick={back}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary rounded-circle" onClick={cont}>
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
