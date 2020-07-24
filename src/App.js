import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from "./context/alert/AlertState";
import QuestionsState from "./context/questions/QuestionsState";
import ConfigState from "./context/config/ConfigState";
import Form from "./components/Form";

const App = () => {
  return (
    <QuestionsState>
      <ConfigState>
        <AlertState>
          <Router>
            <Form />
          </Router>
        </AlertState>
      </ConfigState>
    </QuestionsState>
  );
};

export default App;
