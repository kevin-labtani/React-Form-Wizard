import React from "react";
import { useHistory } from "react-router-dom";

const Confirm = ({ values }) => {
  const {
    name,
    email,
    lunch,
    contactCheck,
    opinion,
    yn,
    number,
    pizza,
    spaghetti,
    soup,
    pet,
  } = values;

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    push("/success");
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Confirm</h1>
      <ul className="list-group">
        <li className="list-group-item">Name: {name}</li>
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Lunch: {lunch}</li>
        <li className="list-group-item">
          Contactable: {contactCheck.toString()}
        </li>
        <li className="list-group-item">Opinion: {opinion}</li>
        <li className="list-group-item">Yes or No: {yn}</li>
        <li className="list-group-item">Number: {number}</li>
        <li className="list-group-item">
          Dinner: {pizza ? "pizza" : ""} {spaghetti ? "spaghetti" : ""}{" "}
          {soup ? "soup" : ""}
        </li>
        <li className="list-group-item">
          Pets:{" "}
          {pet.map((el) => (
            <span key={el}>{el} </span>
          ))}
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
};

export default Confirm;
