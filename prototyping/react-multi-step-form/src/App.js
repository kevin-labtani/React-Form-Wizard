import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Form from "./components/Form";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <div className="container">
          <Router>
            <Form />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
