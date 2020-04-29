import React, { useState } from "react";
import SurveyContext from "./surveyContext";

const SurveyState = (props) => {
  const [survey, setSurvey] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
    twitter: "",
    github: "",
  });

  const inputChange = (input) => (e) => {
    setSurvey({ ...survey, [input]: e.target.value });
  };

  return (
    <SurveyContext.Provider
      value={{
        survey,
        inputChange,
      }}
    >
      {props.children}
    </SurveyContext.Provider>
  );
};

export default SurveyState;
