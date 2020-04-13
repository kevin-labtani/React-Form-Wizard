import { useReducer, useEffect } from "react";

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
  });

  // validate the form when a user makes a change and blur
  useEffect(() => {
    if (props.validate) {
      const errors = props.validate(state.values);
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  }, [state.values]);

  const handleChange = (event) => {
    // in order to access react synthetic events inside of callbacks, you need to persist them
    event.persist();
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: { [event.target.name]: event.target.value },
    });
  };

  // check whether a field has been touched
  const handleBlur = (event) => {
    // in order to access react synthetic events inside of callbacks, you need to persist them
    event.persist();
    dispatch({
      type: "SET_FIELD_TOUCHED",
      payload: { [event.target.name]: true },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate
    // touch every field so user sees all error messages
    // pass on our form values to onSubmit
    props.onSubmit(state.values);
  };
  return { handleChange, handleBlur, handleSubmit, ...state };
}

export default useFormik;
