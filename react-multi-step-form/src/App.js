import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import QuestionsState from "./context/questions/QuestionsState";
import Form from "./components/Form";

const App = () => {
  return (
    <QuestionsState>
      <AlertState>
        <Router>
          <Form />
        </Router>
      </AlertState>
    </QuestionsState>
  );
};

export default App;
