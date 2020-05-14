import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
import Alerts from "./layout/Alerts";

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
      <h3 className="mb-3">Step 4: legal</h3>
      <Alerts />
      <h6>I accept to be contacted</h6>
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
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-6">
          <button className="btn btn-danger btn-circle" onClick={back}>
            <i className="fas fa-arrow-left" />
          </button>
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-primary btn-circle" onClick={cont}>
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
