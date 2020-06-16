import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
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
import FileUpload from "./questionType/FileUpload";
import Recap from "./questionType/Recap";
import Spinner from "./layout/Spinner";
import Footer from "./layout/Footer";

const Form = () => {
  const location = useLocation();
  const { push } = useHistory(); //for autopush option

  const [questionsState, questionsDispatch] = useQuestions();

  const { questions, loading } = questionsState;

  useEffect(() => {
    getQuestions(questionsDispatch);
  }, [questionsDispatch]);

  const [answers, setAnswers] = useState({});

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

  // initialize answer obj
  let initAnswers = {};
  questions.forEach((q) => {
    if (q.question_type_id === 1) {
      initAnswers[q.question_id] = [];
    } else if (
      q.question_type_id !== 15 &&
      q.question_type_id !== 16 &&
      q.question_type_id !== 17
    ) {
      //no values for welcome & thankyou & recap question type
      initAnswers[q.question_id] = "";
    }
  });
  // init on welcome page
  const initAnswerState = () => {
    setAnswers(initAnswers);
  };

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

  const sendAnswers = async (nextQuestionId) => {
    let data = [];
    // ?!?!?
    for (let [key, value] of Object.entries(answers)) {
      let question = questions.filter((q) => q.question_id === parseInt(key));
      if (question[0].question_type_id === 1) {
        value.forEach((element) => {
          data.push({
            question_id: question[0].question_id,
            box_values: { id: element },
          });
        });
      } else {
        data.push({ question_id: question[0].question_id, answer: value });
      }
    }

    console.log(data);
    console.log(answers);
    console.log(JSON.stringify(answers));
    try {
      await axios.post("my-domain.com/file-upload", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      push(`/${nextQuestionId}`);
    } catch (err) {
      console.log(err);
      push(`/${nextQuestionId}`); //REMOVE
    }
  };

  let questionsSwitch = [];
  questions.forEach((q) => {
    switch (q.question_type_id) {
      case 1:
        questionsSwitch.push(
          <Route
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
            render={(routeProps) => (
              <PhoneNumber
                {...routeProps}
                inputChange={inputChange}
                values={answers}
                data={q}
              />
            )}
          />
        );
        break;

      case 12:
        questionsSwitch.push(
          <Route
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
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

      case 13:
        questionsSwitch.push(
          <Route
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
            render={(routeProps) => (
              <FileUpload
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
            key={`${q.question_id}`}
            exact
            path="/"
            render={(routeProps) => (
              <Welcome
                {...routeProps}
                data={q}
                initAnswerState={initAnswerState}
              />
            )}
          />
        );
        break;

      case 16:
        questionsSwitch.push(
          <Route
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
            render={(routeProps) => <ThankYou {...routeProps} data={q} />}
          />
        );
        break;

      case 17:
        questionsSwitch.push(
          <Route
            key={`${q.question_id}`}
            exact
            path={`/${q.question_id}`}
            render={(routeProps) => (
              <Recap
                {...routeProps}
                data={q}
                values={answers}
                questions={questions}
                sendAnswers={sendAnswers}
              />
            )}
          />
        );
        break;

      default:
        break;
    }
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-hu-grey">
      <div className="container my-auto">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            {questionsSwitch}
          </Switch>
        </AnimatePresence>
      </div>
      <Footer questions={questions} loading={loading} answers={answers} />
    </div>
  );
};

export default Form;
