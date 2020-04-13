import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "bob" }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call, disable submit button,...
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name="firstName" // line up with what we want stores in the formik state
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button type="submit" disabled={isSubmitting}>
                submit
              </Button>
            </div>
            {/* pre for debugging */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
