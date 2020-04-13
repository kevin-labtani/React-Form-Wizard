# Catch-Up Wizard Form

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
we're using yup for validation and material-ui for the ui.  
`useFormik` doesn't allow you to wrap your componenet in a context, so we use the `Formik` instead.  
