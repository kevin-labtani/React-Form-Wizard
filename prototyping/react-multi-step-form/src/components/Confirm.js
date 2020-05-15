import React from "react";
import { useHistory } from "react-router-dom";

const Confirm = ({ values }) => {
  const {
    name,
    email,
    contactCheck,
    opinion,
    yn,
    number,
    pet,
    dessert,
    rating,
  } = values;

  const { goBack } = useHistory();

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <div className="form-container">
      <h1 className="mb-5">Confirm</h1>
      <ul className="list-group">
        <li className="list-group-item">
          Name: {name} Email: {email} Contactable: {contactCheck.toString()}
        </li>
        <li className="list-group-item">
          Opinion: {opinion} Yes or No: {yn} Number: {number}
        </li>
        <li className="list-group-item">
          Pets:{" "}
          {pet.map((el) => (
            <span key={el}>{el} </span>
          ))}
        </li>
        <li className="list-group-item">
          Dessert: {dessert} Rating: {rating}
        </li>
      </ul>

      <br />
      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger rounded-circle" onClick={back}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
