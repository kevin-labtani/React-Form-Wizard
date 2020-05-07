import React from "react";
import { useHistory } from "react-router-dom";

const Step4 = ({ values, checkboxChangePush }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step5");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Step 4: legal</h1>
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="contactCheck"
            value="true"
            checked={values.contactCheck}
            onChange={checkboxChangePush("contactCheck", "/step5")}
          />
          <label className="form-check-label" htmlFor="contactCheck">
            I accept to be contacted
          </label>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger" onClick={back}>
            Back
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary" onClick={cont}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
