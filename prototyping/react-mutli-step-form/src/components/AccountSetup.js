import React from "react";

function AccountSetup(props) {
  const cont = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const { values, inputChange } = props;

  return (
    <div className="form-container">
      <h1 className="mb-5">Account Setup</h1>
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

      <div className="text-right">
        <button className="btn btn-primary" onClick={cont}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default AccountSetup;
