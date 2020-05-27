import React from "react";
import { useHistory } from "react-router-dom";

const Confirm = () => {


  const { goBack } = useHistory();

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  return (
    <>
      <h1 className="mb-5 text-white">Thank you for your submission</h1>

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger rounded-circle" onClick={back}>
            <i className="fas fa-arrow-up" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm;
