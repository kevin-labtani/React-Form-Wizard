import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import Form from "./components/Form";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

const App = () => {
  return (
    <AlertState>
      <Navbar />
      <div className="App">
        <div className="container">
          <Alerts />
          <Router>
            <Form />
          </Router>
        </div>
      </div>
    </AlertState>
  );
};

export default App;
