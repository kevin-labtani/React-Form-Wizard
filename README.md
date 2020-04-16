# Catch-Up Wizard Form

## Question types

- multiple_choice
- single_choice
- yes_no
- legal
- rating
- short_text
- opinion_scale
- email
- number

## Prototyping

### Multi-step form with react

`Form` is the parent component and keep track of the step (a number corresponding to the specific form step we're at), the state for all the fields and methods `nextStep()` and `prevStep()` to navigate through the form. We use a switch statement to keep track of which component to serve to the user.  
Then we simply have one component for each page.  
Interaction with back-end would be on Confirm page.  
You could process the form at each steps in the `cont()` or `back()` function.

### Formik clone with react hooks

We start with a classic react class component ans build a Formik clone with hooks in order to handle our forms.  
While extra verbose, the advantage of our `useFormik` hooks is that it is completely decoupled from our Form component.  
handleBlur is used to inform us that a user has touched the field; we use blur (vs mousedown) for error display reasons, we don't want to show a validation error until the user has touched the field.  
useEffect is used to validate the form when a user makes a change and blur  
nb: typically we'll want to disable the submit button while another submission is going on, that's why `isSubmitting` is important.
To go further we could put formik into context

### Using formik 2.0

We're using yup for validation and material-ui for the ui.  
`useFormik` doesn't allow you to wrap your componenet in a context, so we use the `Formik` instead.  
Note how we can simplify our code using the formik `Field` component:

```js
<Field placeholder="first name" name="firstName" type="input" as={TextField}/>
// is equivalent to: (and the placeholder prop is passed to MUI TextField)
<TextField
  placeholder="first name"
  name="firstName" // line up with what we want stores in the formik state
  value={values.firstName}
  onChange={handleChange}
  onBlur={handleBlur}
/>
```

we can also use the `Form` component to not have to manually pass a `handleSubmit()` method to the form  
When an UI component doesn't map cleanly to a formik `Field` we can create a custom Field component

### Using react-hook-form

Validation using react-hook-form.  
We register each input ref into react-hook-form so it can subscribe and listen to the changes and valdiate data at the end.  
Errors auto clear when user corrects them.

### Multi-step form with react-hook-form

We're using react-router for routing and little-state-machine as our equivalent of redux and for persistent storage.

### Multi-step form with formik

Let's compare our implementation of a multi step form with formik tot he react-hook-form implementation
