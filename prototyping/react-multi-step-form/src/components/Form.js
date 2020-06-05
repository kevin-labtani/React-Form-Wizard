import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {
  useQuestions,
  getQuestions,
} from "../context/questions/QuestionsState";
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
import LongText from "./questionType/LongText";
import Welcome from "./questionType/Welcome";
import ThankYou from "./questionType/ThankYou";
import Spinner from "./layout/Spinner";
import Footer from "./layout/Footer";

const Form = () => {
  const [questionsState, questionsDispatch] = useQuestions();

  const { questions, loading } = questionsState;

  useEffect(() => {
    getQuestions(questionsDispatch);
  }, [questionsDispatch]);

  // initialize answer obj NEED TO CHANGE THIS
  let initAnswers = {};
  questions.forEach((q) => {
    if (q["question_type_id"] === 1) {
      initAnswers[q["question_id"]] = [];
    } else if (q["question_type_id"] !== 15 && q["question_type_id"] !== 16) {
      //no values for welcome & thanyou question type
      initAnswers[q["question_id"]] = "";
    }
  });

  const { push } = useHistory(); //for autopush option
  const [answers, setAnswers] = useState(initAnswers);

  // load data from localSotrage
  useEffect(() => {
    const data = localStorage.getItem("answers");
    if (data) {
      setAnswers(JSON.parse(data));
    }
  }, []);

  // save data to localStorage
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const inputChange = (input) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
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
  // const SingleCheckboxChangePush = (input, next) => (e) => {
  //   setAnswers({ ...answers, [input]: e.target.value });
  //   push(next);
  // };

  const multiCheckboxChange = (input) => (e) => {
    const oldArr = answers[input];
    if (e.target.checked) {
      oldArr.push(e.target.value);
      setAnswers({ ...answers, [input]: oldArr });
    } else {
      const filteredArr = oldArr.filter((pet) => pet !== e.target.value);
      setAnswers({ ...answers, [input]: filteredArr });
    }
  };

  const SingleCheckboxChange = (input) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
  };

  if (loading) {
    return <Spinner />;
  }

  let questionsSwitch = [];
  questions.forEach((q) => {
    switch (q["question_type_id"]) {
      case 1:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <MultipleChoice
                {...routeProps}
                multiCheckboxChange={multiCheckboxChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 2:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <SingleChoice
                {...routeProps}
                SingleCheckboxChange={SingleCheckboxChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 3:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <YesNo
                {...routeProps}
                SingleCheckboxChange={SingleCheckboxChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 4:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <Legal
                {...routeProps}
                SingleCheckboxChange={SingleCheckboxChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 5:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <Rating
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 6:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <ShortText
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 7:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <OpinionScale
                {...routeProps}
                SingleCheckboxChange={SingleCheckboxChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 8:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <Email
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 9:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <Number
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 10:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <PhoneNumber
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
                totalQuestions={questions.length}
              />
            )}
          />
        );
        break;

      case 12:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => (
              <LongText
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 15:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path="/"
            render={(routeProps) => <Welcome {...routeProps} data={q} />}
          />
        );
        break;

      case 16:
        questionsSwitch.push(
          <Route
            key={`${q["question_id"]}`}
            exact
            path={`/${q["question_id"]}`}
            render={(routeProps) => <ThankYou {...routeProps} data={q} />}
          />
        );
        break;

      default:
        break;
    }
  });

  return (
    <>
      <div className="container my-auto">
        <Switch>{questionsSwitch}</Switch>
      </div>
      <Footer questions={questions} loading={loading} />
    </>
  );
};

export default Form;
