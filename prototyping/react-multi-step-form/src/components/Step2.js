import React from "react";
import { useHistory } from "react-router-dom";

const Step2 = ({ values, inputChange }) => {
  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/step3");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Step 2</h1>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          onChange={inputChange("phone")}
          value={values.phone}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={inputChange("password")}
          value={values.password}
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

export default Step2;
