import { useReducer, useEffect } from "react";
import { setNestedObjectValues } from "../utils";

function reducer(state, action) {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        // so we can overwrite errors if they go away; we don't do the spread of prev. errors
        errors: action.payload,
      };
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case "SET_FIELD_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        isSubmitting: true,
        // takes an object and sets every single field of it to true
        touched: setNestedObjectValues(state.values, true),
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
      };
    case "SUBMIT_FAIL":
      return {
        ...state,
        isSubmitting: false,
        // can do a bunch of other things here...
        submitError: action.payload,
      };
    default:
      return state;
  }
}

function useFormik(props) {
  if (!props.onSubmit) {
    throw new Error("You forgot to pass onSubmit to useFormik!");
  }

  // useState hook doesn't "spread" so we use useReducer instead as we have nested values in our object
  const [state, dispatch] = useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  // validate the form when a user makes a change and blur
  useEffect(() => {
    if (props.validate) {
      const errors = props.validate(state.values);
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  }, [state.values]);

  const handleChange = (fieldName) => (event) => {
    // in order to access react synthetic events inside of callbacks, you need to persist them
    event.persist();
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: { [fieldName]: event.target.value },
    });
  };

  // check whether a field has been touched
  const handleBlur = (fieldName) => (event) => {
    dispatch({
      type: "SET_FIELD_TOUCHED",
      payload: { [fieldName]: true },
    });
  };

  // used to make the form less verbose, we'll spread it to replace value, onChange and onBlur
  // we use currying so we don't need eg. name="email" prop in the form
  const getFieldProps = (fieldName) => ({
    value: state.values[fieldName],
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // touch every field so user sees all error messages
    dispatch({ type: "SUBMIT_ATTEMPT" });
    // validate
    const errors = props.validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        // if error object is empty
        // pass on our form values to onSubmit
        await props.onSubmit(state.values);
        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch (submitError) {
        // api is down, name isn't good,...
        dispatch({ type: "SUBMIT_FAIL", payload: submitError });
      }
    } else {
      dispatch({ type: "SET_ERRORS", payload: errors });
      dispatch({ type: "SUBMIT_FAIL" });
    }
  };
  return { handleChange, handleBlur, handleSubmit, getFieldProps, ...state };
}

export default useFormik;
