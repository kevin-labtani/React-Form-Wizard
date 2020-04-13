import React from "react";

function Confirm(props) {
  const cont = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const {
    values: { name, email, phone, password, facebook, twitter, github },
  } = props;

  return (
    <div className="form-container">
      <h1 className="mb-5">Confirm</h1>
      <ul class="list-group">
        <li class="list-group-item">Name: {name}</li>
        <li class="list-group-item">Email: {email}</li>
        <li class="list-group-item">Phone Number: {phone}</li>
        <li class="list-group-item">Password: {password}</li>
        <li class="list-group-item">
          Facebook URL: <a href={facebook}>{facebook}</a>
        </li>
        <li class="list-group-item">
          Twitter URL: <a href={twitter}>{twitter}</a>
        </li>
        <li class="list-group-item">
          Github URL: <a href={github}>{github}</a>
        </li>
      </ul>

      <br />
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

export default Confirm;
