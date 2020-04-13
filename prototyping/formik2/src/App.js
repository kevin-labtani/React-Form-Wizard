import React from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as yup from "yup";

// we're creating a custom radio field as MUI radio component doesn't map cleanly to a formik Field and we want to add a label to the radio button
const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      {...field} // will dstructure the value, onChange, onBlur, etc
      control={<Radio />}
      label={label}
    />
  );
};

// we're doing a custom text field cuz wz want to bdoge able to display errors
const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText} // casting the string to a boolean
    />
  ); // helperText from MUIdog
};

// yup validation schema
const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yoghurt: "",
          pets: [{ type: "cat", name: "lily", id: "" + Math.random() }],
        }}
        // validation by hand
        // validate={(values) => {
        //   const errors = {};

        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob allowed!";
        //   }

        //   return errors;
        // }}
        // validate with yup:
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call, disable submit button,...
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField placeholder="first name" name="firstName" />
            </div>
            <div>
              <Field
                placeholder="last name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>
            dog
            <div>You're tall: </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            {/* we're creating a checkbox group: */}
            <div>cookies:</div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="pecan nut"
              as={Checkbox}
            />
            <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
            <div>Yoghurt: </div>
            <MyRadio name="yoghurt" type="radio" value="peach" label="peach" />
            <MyRadio
              name="yoghurt"
              type="radio"
              value="bluberry"
              label="bluberry"
            />
            <MyRadio name="yoghurt" type="radio" value="apple" label="apple" />
            {/* select fields with our pets array demonstrating both formik fieldArray and select fields */}
            <FieldArray name="pets">
              {/* arrayHelpers from formik */}
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: "frog",
                        name: "",
                        id: "" + Math.random(),
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder="pet name"
                          name={`pets.${index}.name`} //pets.0.name is jarvis
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <div>
              <Button type="submit" disabled={isSubmitting}>
                submit
              </Button>
            </div>
            {/* pre for debugging */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
