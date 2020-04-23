import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Form />
        </Router>
      </div>
    </div>
  );
}

export default App;
