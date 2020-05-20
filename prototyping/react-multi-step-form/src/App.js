import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import Form from "./components/Form";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <AlertState>
      <div className="min-vh-100 d-flex flex-column justify-content-between bg-hu-grey">
        <Navbar />
        <div className="container">
          <Router>
            <Form />
          </Router>
        </div>
        <Footer />
      </div>
    </AlertState>
  );
};

export default App;
