import React from "react";
import { useHistory } from "react-router-dom";

function Step1(props) {
  const { values, inputChange } = props;
  const { push } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    values.email === "admin@admin" ? push("/step3") : push("/step2");
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Step 1</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={inputChange("name")}
          value={values.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={inputChange("email")}
          value={values.email}
        />
      </div>

      <br />

      <div className="text-right">
        <button className="btn btn-primary" onClick={cont}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step1;
