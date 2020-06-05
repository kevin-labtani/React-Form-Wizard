import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import QuestionsState from "./context/questions/QuestionsState";
import Form from "./components/Form";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <QuestionsState>
      <AlertState>
        <Router>
          <div className="min-vh-100 d-flex flex-column bg-hu-grey">
            <Form />
          </div>
        </Router>
      </AlertState>
    </QuestionsState>
  );
};

export default App;
