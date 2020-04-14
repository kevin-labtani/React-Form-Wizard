import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Step1 = props => {
  const { handleSubmit, errors } = useForm();
  const { push } = useHistory();
  const onSubmit = data => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <label>
        First Name:
        <input name="firstName" />
      </label>
      <label>
        Last Name:
        <input name="lastName" />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Step1;
