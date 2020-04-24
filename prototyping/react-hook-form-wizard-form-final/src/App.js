import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Pages from "./components/Pages";

import "./styles.css";

// global store for all the form data
createStore({
  yourDetails: {
    firstName: "",
    lastName: "",
    age: "",
    yearsOfExp: "",
  },
});

const App = () => {
  return (
    <StateMachineProvider>
      <div className="container">
        <h1>Hike-Up Form Wizard</h1>
        <Router>
          <Pages />
        </Router>
      </div>
    </StateMachineProvider>
  );
};

export default App;
