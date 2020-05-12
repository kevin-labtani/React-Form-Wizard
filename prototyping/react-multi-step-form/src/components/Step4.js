import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

const Step4 = ({ values, SingleCheckboxChangePush }) => {
  const { setAlert } = useContext(AlertContext);

  const { push, goBack } = useHistory();

  const cont = (e) => {
    e.preventDefault();
    if (!values.contactCheck) {
      setAlert("Veuillez faire un choix", "danger");
    } else {
      push("/step5");
    }
  };

  const back = (e) => {
    e.preventDefault();
    goBack();
  };

  // alternative way to auto push to next step
  // const checkboxChangePush = (e) => {
  //   checkboxChange("contactCheck")(e);
  //   cont(e);
  // };

  return (
    <div className="form-container">
      <h1 className="mb-5 text-center">Step 4: legal</h1>
      <h3>I accept to be contacted</h3>
      <div className="form-group">
        <div className="form-check">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="yes"
              id="checkbox1"
              checked={values.contactCheck === "yes"}
              onChange={SingleCheckboxChangePush("contactCheck", "/step5")}
            />
            <label className="form-check-label" htmlFor="checkbox1">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="no"
              id="checkbox2"
              checked={values.contactCheck === "no"}
              onChange={SingleCheckboxChangePush("contactCheck", "/step5")}
            />
            <label className="form-check-label" htmlFor="checkbox2">
              No
            </label>
          </div>
          {/* <input
            className="form-check-input"
            type="checkbox"
            id="contactCheck"
            value="true"
            checked={values.contactCheck}
            onChange={checkboxChangePush("contactCheck", "/step5")}
          />
          <label className="form-check-label" htmlFor="contactCheck">
            I accept to be contacted
          </label> */}
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
