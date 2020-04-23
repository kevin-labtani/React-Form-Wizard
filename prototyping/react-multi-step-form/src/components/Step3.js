import React from "react";
import { useHistory } from "react-router-dom";

function Step3({ values, inputChange }) {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/confirm");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Step 3</h1>
      <div className="form-group">
        <label htmlFor="facebook">Facebook URL</label>
        <input
          type="text"
          className="form-control"
          name="facebook"
          onChange={inputChange("facebook")}
          value={values.facebook}
        />
      </div>
      <div className="form-group">
        <label htmlFor="twitter">Twitter URL</label>
        <input
          type="text"
          className="form-control"
          name="twitter"
          onChange={inputChange("twitter")}
          value={values.twitter}
        />
      </div>
      <div className="form-group">
        <label htmlFor="github">Github URL</label>
        <input
          type="text"
          className="form-control"
          name="github"
          onChange={inputChange("github")}
          value={values.github}
        />
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
}

export default Step3;