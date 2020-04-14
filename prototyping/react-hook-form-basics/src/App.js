import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

function App() {
  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  const { register, handleSubmit } = useForm();

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <label>First Name:</label>
      <input name="firstName" ref={register({ required: true })} />

      <label>Last Name:</label>
      <input name="lastName" ref={register({ required: true })} />

      <label>Gender</label>
      <select name="gender" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Username</label>
      <input name="username" ref={register({ required: true })} />

      <label>Email</label>
      <input name="email" ref={register({ required: true })} />

      <label>About you</label>
      <textarea name="about you" ref={register({ required: true })} />

      <input type="submit" />
    </form>
  );
}

export default App;
