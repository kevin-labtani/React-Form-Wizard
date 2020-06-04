import React from "react";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const { push } = useHistory();

  const fwd = (e) => {
    e.preventDefault();
    push("/1");
  };

  return (
    <div className="jumbotron bg-hu-grey-1 text-center">
      <h1 className="mb-5">Welcome to the HikeUp Wizard Form</h1>
      <p className="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
        inventore dolor deleniti a optio! Rem magnam fuga ullam ipsam
        voluptatibus!
      </p>
      <button className="btn btn-primary btn-lg px-5 my-3" onClick={fwd}>
        Start
      </button>
    </div>
  );
};

export default Welcome;
