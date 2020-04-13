# Catch-Up Wizard Form

## Prototyping

### Formik clone with react hooks

We start with a classic react class component ans build a Formik clone with hooks in order to handle our forms.  
While extra verbose, the advantage of our useFormik hooks is that it is completely decoupled from our Form component.  
handleBlur is used to inform us that a user has touched the field; we use blur (vs mousedown) for error display reasons, we don't want to show a validation error until the user has touched the field.  
useEffect is used to validate the form when a user makes a change and blur