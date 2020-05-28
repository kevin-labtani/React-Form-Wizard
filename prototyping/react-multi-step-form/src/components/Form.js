import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import QuestionsContext from "../context/questions/questionsContext";
import Email from "./questionType/Email";
import ShortText from "./questionType/ShortText";
import SingleChoice from "./questionType/SingleChoice";
import Legal from "./questionType/Legal";
import OpinionScale from "./questionType/OpinionScale";
import YesNo from "./questionType/YesNo";
import Number from "./questionType/Number";
import MultipleChoice from "./questionType/MultipleChoice";
import Rating from "./questionType/Rating";
import PhoneNumber from "./questionType/PhoneNumber";
import Confirm from "./Confirm";
import Spinner from "./layout/Spinner"

const Form = () => {
  const { getQuestions, questions, loading } = useContext(QuestionsContext);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  const { push } = useHistory();
  const [contact, setContact] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: [],
    9: "",
    10: "",
  });

  // load data from localSotrage
  useEffect(() => {
    const data = localStorage.getItem("contact");
    if (data) {
      setContact(JSON.parse(data));
    }
  }, []);

  // save data to localStorage
  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contact));
  }, [contact]);

  const inputChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  // const checkboxChange = (input) => (e) => {
  //   setContact({ ...contact, [input]: e.target.checked });
  // };

  // auto push to next question
  // was implemented on step4 as an example
  // const checkboxChangePush = (input, next) => (e) => {
  //   setContact({ ...contact, [input]: e.target.checked });
  //   push(next);
  // };
  const SingleCheckboxChangePush = (input, next) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
    push(next);
  };

  const multiCheckboxChange = (input) => (e) => {
    const oldArr = contact[input];
    if (e.target.checked) {
      oldArr.push(e.target.value);
      setContact({ ...contact, [input]: oldArr });
    } else {
      const filteredArr = oldArr.filter((pet) => pet !== e.target.value);
      setContact({ ...contact, [input]: filteredArr });
    }
  };

  const SingleCheckboxChange = (input) => (e) => {
    setContact({ ...contact, [input]: e.target.value });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <Email {...routeProps} inputChange={inputChange} values={contact} />
        )}
      />
      <Route
        exact
        path="/step2"
        render={(routeProps) => (
          <ShortText
            {...routeProps}
            inputChange={inputChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step3"
        render={(routeProps) => (
          <SingleChoice
            {...routeProps}
            SingleCheckboxChange={SingleCheckboxChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step4"
        render={(routeProps) => (
          <Legal
            {...routeProps}
            SingleCheckboxChangePush={SingleCheckboxChangePush}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step5"
        render={(routeProps) => (
          <OpinionScale
            {...routeProps}
            SingleCheckboxChange={SingleCheckboxChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step6"
        render={(routeProps) => (
          <YesNo
            {...routeProps}
            SingleCheckboxChange={SingleCheckboxChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step7"
        render={(routeProps) => (
          <Number {...routeProps} inputChange={inputChange} values={contact} />
        )}
      />
      <Route
        exact
        path="/step8"
        render={(routeProps) => (
          <MultipleChoice
            {...routeProps}
            multiCheckboxChange={multiCheckboxChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/step9"
        render={(routeProps) => (
          <Rating {...routeProps} inputChange={inputChange} values={contact} />
        )}
      />
      <Route
        exact
        path="/step10"
        render={(routeProps) => (
          <PhoneNumber
            {...routeProps}
            inputChange={inputChange}
            values={contact}
          />
        )}
      />
      <Route
        exact
        path="/confirm"
        render={(routeProps) => <Confirm {...routeProps} values={contact} />}
      />
    </Switch>
  );
};

export default Form;
