import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  useQuestions,
  getQuestions,
} from "../context/questions/QuestionsState";
import { v4 as uuidv4 } from "uuid";
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
  const { push } = useHistory();

  const [questionsState, questionsDispatch] = useQuestions();

  const { questions, loading } = questionsState;

  useEffect(() => {
    getQuestions(questionsDispatch);
  }, [questionsDispatch]);

  const [lastLocation, setLastLocation] = useState("");
  const [answers, setAnswers] = useState({});
  const [timings, setTimings] = useState({});
  const [responseUuid, setResponseUuid] = useState("");

  // load data from localStorage
  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("answers"));
    if (answers) {
      setAnswers(answers);
    }

    const timings = JSON.parse(localStorage.getItem("timings"));
    if (timings) {
      setTimings(timings);
    }

    const id = JSON.parse(localStorage.getItem("responseUuid"));
    if (id) {
      setResponseUuid(id);
    }

    const location = JSON.parse(localStorage.getItem("lastLocation"));
    if (location) {
      setLastLocation(location);
    }
  }, []);

  // save data to localStorage
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("timings", JSON.stringify(timings));
    localStorage.setItem("responseUuid", JSON.stringify(responseUuid));
    localStorage.setItem("lastLocation", JSON.stringify(lastLocation));
  }, [answers, timings, responseUuid, lastLocation]);

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

  let initTimings = {};
  questions.forEach((q) => {
    if (
      q.question_type_id !== 15 &&
      q.question_type_id !== 16 &&
      q.question_type_id !== 17
    ) {
      initTimings[q.question_id] = "";
    }
  });

  // init on welcome page
  const initAnswerState = () => {
    const id = uuidv4();
    setResponseUuid(id);
    setAnswers(initAnswers);
    setTimings(initTimings);
    setLastLocation("");
  };

  const updateTimerLocation = (questionId, nextQuestionId, timer) => {
    let totalTime = +timings[questionId] + timer;
    setTimings({ ...timings, [questionId]: totalTime.toFixed(2) });
    setLastLocation(nextQuestionId);
  };

  const inputChange = (input) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
  };

  const inputChangePush = (input, nextQuestion) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
    setTimeout(() => {
      push(`/${nextQuestion}`);
    }, 1000);
  };

  const multiCheckboxChange = (input) => (e) => {
    let oldArr = answers[input] || [];
    if (e.target.value.startsWith("$") || e.target.value === "") {
      oldArr = oldArr.filter((el) => el.startsWith("*"));
      e.target.value && oldArr.push(e.target.value);
      setAnswers({ ...answers, [input]: oldArr });
    } else {
      if (e.target.checked) {
        oldArr.push("*" + e.target.value);
        setAnswers({ ...answers, [input]: oldArr });
      } else {
        const filteredArr = oldArr.filter((el) => el !== "*" + e.target.value);
        setAnswers({ ...answers, [input]: filteredArr });
      }
    }
  };

  // const SingleCheckboxChange = (input, nextQuestion) => (e) => {
  //   setAnswers({ ...answers, [input]: e.target.value });
  // };

  const singleCheckboxChangePush = (input, nextQuestion, routingId = null) => (
    e
  ) => {
    setAnswers({ ...answers, [input]: "*" + e.target.value });
    setTimeout(() => {
      routingId ? push(`/${routingId}`) : push(`/${nextQuestion}`);
    }, 1200);
  };

  const constructAnswer = () => {
    let data = [];
    for (let [key, value] of Object.entries(answers)) {
      let question = questions.filter((q) => q.question_id === parseInt(key));
      let type = question[0].question_type_id;
      if (type === 1) {
        value.forEach((element) => {
          if (element.startsWith("$")) {
            data.push({
              assessment_id: question[0].assessment_id,
              question_id: question[0].question_id,
              question_timing: timings[key],
              free_text: element.substr(1),
            });
          } else if (element.startsWith("*")) {
            data.push({
              assessment_id: question[0].assessment_id,
              question_id: question[0].question_id,
              question_timing: timings[key],
              box_value_id: element.substr(1),
            });
          }
        });
      } else if (type === 2) {
        if (value && !value.startsWith("*")) {
          data.push({
            assessment_id: question[0].assessment_id,
            question_id: question[0].question_id,
            question_timing: timings[key],
            free_text: value,
          });
        } else if (value.startsWith("*")) {
          data.push({
            assessment_id: question[0].assessment_id,
            question_id: question[0].question_id,
            question_timing: timings[key],
            box_value_id: value.substr(1),
          });
        }
      } else if ((type === 3 || type === 4 || type === 7) && value) {
        data.push({
          assessment_id: question[0].assessment_id,
          question_id: question[0].question_id,
          question_timing: timings[key],
          box_value_id: value.substr(1),
        });
      } else if (
        (type === 5 ||
          type === 6 ||
          type === 8 ||
          type === 9 ||
          type === 10 ||
          type === 12 ||
          type === 13) &&
        value
      ) {
        data.push({
          assessment_id: question[0].assessment_id,
          question_id: question[0].question_id,
          question_timing: timings[key],
          free_text: value,
        });
      }
    }
    return data;
  };

  const sendAnswer = async (nextQuestionId = null) => {
    let data = constructAnswer();
    try {
      console.log(data);
      // https://cors-anywhere.herokuapp.com/https://preprod.hike-up.be/api/fillARH/5c9ccc2c-c64f-4af8-8a7d-ed52dcee8434/${responseUuid}
      let res = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Status code: ${res.status}`);
      nextQuestionId && push(`/${nextQuestionId}`);
    } catch (err) {
      console.log(err);
    }
  };

  // window.onbeforeunload = () => {
  //   let data = constructAnswer();
  //   console.log(data);
  //   // localStorage.setItem("answers", JSON.stringify(answers));
  //   sendAnswer();
  //   // navigator.sendBeacon("https://jsonplaceholder.typicode.com/posts", JSON.stringify(data));
  //   return "Are you sure you want to leave?";
  // };

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
                updateTimerLocation={updateTimerLocation}
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
                singleCheckboxChangePush={singleCheckboxChangePush}
                inputChange={inputChange}
                updateTimerLocation={updateTimerLocation}
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
                singleCheckboxChangePush={singleCheckboxChangePush}
                updateTimerLocation={updateTimerLocation}
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
                singleCheckboxChangePush={singleCheckboxChangePush}
                updateTimerLocation={updateTimerLocation}
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
                inputChangePush={inputChangePush}
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                singleCheckboxChangePush={singleCheckboxChangePush}
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                updateTimerLocation={updateTimerLocation}
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
                lastLocation={lastLocation}
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
                answers={answers}
                questions={questions}
                sendAnswer={sendAnswer}
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
