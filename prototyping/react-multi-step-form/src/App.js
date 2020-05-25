import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import Form from "./components/Form";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <AlertState>
      <div className="min-vh-100 d-flex flex-column bg-hu-grey">
        <div className="container my-auto">
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
