import React from "react";
import useFormik from "./hooks/useFormik";

// add delay so we can play around with async/await and seed that isSubmitting get set to true when we submit
// nb: typically we'll want to disable the submit button while another submission is going o, that's why isSUbmititng is important.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function NameForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async (values) => {
      await sleep(1000);
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      let errors = {};
      // dummy validation for the sake of example
      if (values.name !== "admin") {
        errors.name = "you are not allowed";
      }
      return errors;
    },
  });

  const { handleSubmit, getFieldProps, touched, errors, submitError } = formik;

  return (
    <form onSubmit={handleSubmit}>
      {/* submitError doesn't actually exist here, jsut an example */}
      {submitError && submitError}
      <label>
        Name:
        <input type="text" {...getFieldProps("name")} />
        {errors.name && touched.name && (
          <div style={{ color: "red" }}>{errors.name}</div>
        )}
      </label>
      <br />
      <label>
        Email:
        <input type="text" {...getFieldProps("email")} />
        {errors.email && touched.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NameForm;
