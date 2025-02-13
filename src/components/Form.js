import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  useQuestions,
  getQuestions,
} from "../context/questions/QuestionsState";
import { useConfig, getConfig } from "../context/config/ConfigState";
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
import ErrorPage from "./ErrorPage";
import {
  browserName,
  userAgent,
  browserPreferredLanguage,
  userPlatform,
  referrer,
  mobile,
} from "../browserData";

const Form = () => {
  const location = useLocation();
  const { push } = useHistory();

  const [lastLocation, setLastLocation] = useState(""); // last question user was on
  const [answers, setAnswers] = useState({});
  const [timings, setTimings] = useState({});
  const [responseUuid, setResponseUuid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);

  // use custom hook to consume our state and dispatch
  const [questionsState, questionsDispatch] = useQuestions();

  const { questions, loadingQuestions, errorLoadingQuestions } = questionsState;

  // use custom hook to consume our state and dispatch
  const [configState, configDispatch] = useConfig();

  const { loadingConfig, errorLoadingConfig } = configState;

  // load data from api
  useEffect(() => {
    getQuestions(questionsDispatch);
    getConfig(configDispatch);
  }, [questionsDispatch, configDispatch]);

  // load data from localStorage if there's any on app load
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

  // initialize answer object
  //  QUESTION ID KEY:
  // 1: MultipleChoice
  // 2: SingleChoice
  // 3: YesNo
  // 4: Legal
  // 5: Rating
  // 6: ShortText
  // 7: OpinionScale
  // 8: Email
  // 9: Number
  // 10: PhoneNumber
  // 11:
  // 12: LongText
  // 13: FileUpload
  // 14:
  // 15: Welcome
  // 16: ThankYou
  // 17: Recap
  let initAnswers = {};
  questions.forEach((q) => {
    if (q.question_type_id === 1) {
      initAnswers[q.question_id] = [];
    } else if (
      q.question_type_id !== 15 &&
      q.question_type_id !== 16 &&
      q.question_type_id !== 17
    ) {
      //no answers for welcome & thankyou & recap question type
      initAnswers[q.question_id] = "";
    }
  });

  // initialize timings object
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

  // init app on welcome page
  const initAnswerState = () => {
    const id = uuidv4();
    setResponseUuid(id);
    setAnswers(initAnswers);
    setTimings(initTimings);
    setLastLocation("");
  };

  // update time and location on each question being answered
  const updateTimerLocation = (questionId, nextQuestionId, timer) => {
    let totalTime = +timings[questionId] + timer;
    setTimings({
      ...timings,
      [questionId]: totalTime.toFixed(2),
    });
    setLastLocation(nextQuestionId);
  };

  // for questions with an input field
  const inputChange = (input) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
  };

  // for FileUpload question
  const fileUploadChange = (input) => (uniqueName) => {
    setAnswers({
      ...answers,
      [input]: uniqueName,
    });
  };

  // for singlechoice question with free "other" field,  will auto send user to next question
  const inputChangePush = (input, nextQuestion) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
    setTimeout(() => {
      push(`/${nextQuestion}`);
    }, 1000);
  };

  // for multiplechoice question
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

  // not used
  // const SingleCheckboxChange = (input, nextQuestion) => (e) => {
  //   setAnswers({ ...answers, [input]: e.target.value });
  // };

  // for questions with a single choice, will auto send user to next question
  const singleCheckboxChangePush = (input, nextQuestion, routingId = null) => (
    e
  ) => {
    setAnswers({
      ...answers,
      [input]: "*" + e.target.value,
    });
    setTimeout(() => {
      routingId ? push(`/${routingId}`) : push(`/${nextQuestion}`);
    }, 1200);
  };

  // construct the answer array sent to api
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
              question_timing: Math.round(timings[key]),
              free_text: element.substr(1),
            });
          } else if (element.startsWith("*")) {
            data.push({
              assessment_id: question[0].assessment_id,
              question_id: question[0].question_id,
              question_timing: Math.round(timings[key]),
              box_value_id: element.substr(1),
            });
          }
        });
      } else if (type === 2) {
        if (value && !value.startsWith("*")) {
          data.push({
            assessment_id: question[0].assessment_id,
            question_id: question[0].question_id,
            question_timing: Math.round(timings[key]),
            free_text: value,
          });
        } else if (value.startsWith("*")) {
          data.push({
            assessment_id: question[0].assessment_id,
            question_id: question[0].question_id,
            question_timing: Math.round(timings[key]),
            box_value_id: value.substr(1),
          });
        }
      } else if ((type === 3 || type === 4 || type === 7) && value) {
        data.push({
          assessment_id: question[0].assessment_id,
          question_id: question[0].question_id,
          question_timing: Math.round(timings[key]),
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
          question_timing: Math.round(timings[key]),
          free_text: value,
        });
      }
    }
    // add stats
    data.push({
      browser_name: browserName,
      browser_useragent: userAgent,
      browser_preferred_language: browserPreferredLanguage,
      user_platform: userPlatform,
      referrer: referrer,
      mobile: mobile,
    });

    return data;
  };

  // send answer to api
  const sendAnswer = async (nextQuestionId = null) => {
    setErrorUploading(false);
    setUploading(true);
    let data = constructAnswer();
    try {
      // console.log(data);
      let res = await axios.post(
        // add your url to the backend api
        // `https://url/to/api/${responseUuid}/true`,
        `https://jsonplaceholder.typicode.com/posts`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(`Status code: ${res.status}`);
      nextQuestionId && push(`/${nextQuestionId}`);
      setUploading(false);
    } catch (err) {
      setErrorUploading(true);
      setUploading(false);
      // console.log(err);
    }
  };

  // for partial submission
  window.onbeforeunload = () => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("timings", JSON.stringify(timings));
    localStorage.setItem("responseUuid", JSON.stringify(responseUuid));
    localStorage.setItem("lastLocation", JSON.stringify(lastLocation));

    // extract assessment_id from welcome question
    let assessmentId;
    questions.forEach((q) => {
      if (q.question_type_id === 15) {
        assessmentId = q.assessment_id;
      }
    });

    navigator.sendBeacon(
      // add your url to the backend api
      `https://url/to/api/${responseUuid}/false/${lastLocation}/${assessmentId}`,
      "partialSubmit"
    );
    return "Are you sure you want to leave?";
  };

  // create the switch with all the questions we got from the api, one case per question type
  let questionsSwitch = [];
  questions.forEach((q) => {
    switch (q.question_type_id) {
      case 1:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <MultipleChoice
              multiCheckboxChange={multiCheckboxChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 2:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <SingleChoice
              singleCheckboxChangePush={singleCheckboxChangePush}
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 3:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <YesNo
              singleCheckboxChangePush={singleCheckboxChangePush}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 4:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <Legal
              singleCheckboxChangePush={singleCheckboxChangePush}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 5:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <Rating
              inputChangePush={inputChangePush}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 6:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <ShortText
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 7:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <OpinionScale
              singleCheckboxChangePush={singleCheckboxChangePush}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 8:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <Email
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 9:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <Number
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 10:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <PhoneNumber
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 12:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <LongText
              inputChange={inputChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 13:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <FileUpload
              fileUploadChange={fileUploadChange}
              updateTimerLocation={updateTimerLocation}
              answers={answers}
              data={q}
            />
          </Route>
        );
        break;

      case 15:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path="/">
            <Welcome
              data={q}
              lastLocation={lastLocation}
              initAnswerState={initAnswerState}
            />
          </Route>
        );
        break;

      case 16:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            <ThankYou data={q} />
          </Route>
        );
        break;

      case 17:
        questionsSwitch.push(
          <Route key={`${q.question_id}`} exact path={`/${q.question_id}`}>
            {" "}
            <Recap
              data={q}
              answers={answers}
              questions={questions}
              sendAnswer={sendAnswer}
              uploading={uploading}
              errorUploading={errorUploading}
            />
          </Route>
        );
        break;

      default:
        break;
    }
  });

  // return a loading spinner while we load data from api
  if (loadingQuestions || loadingConfig) {
    return <Spinner />;
  }

  // error page if no connection to api
  if (errorLoadingQuestions || errorLoadingConfig) {
    return <ErrorPage />;
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
      <Footer
        questions={questions}
        loading={loadingQuestions}
        answers={answers}
      />
    </div>
  );
};

export default Form;
