import React from "react";
import useFormik from "./hooks/useFormik";

function NameForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: (values) => {
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

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <div style={{ color: "red" }}>{errors.name}</div>
        )}
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NameForm;
