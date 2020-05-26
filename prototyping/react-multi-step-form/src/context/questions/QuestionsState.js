import React, { useReducer } from "react";
import axios from "axios";
import QuestionsContext from "./questionsContext";
import QuestionsReducer from "./questionsReducer";
import { GET_QUESTIONS, SET_LOADING } from "../types";

const QuestionsState = (props) => {
  const initialState = {
    questions: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(QuestionsReducer, initialState);

  // get questions from DB
  const getQuestions = async () => {
    // setLoading();
    // // req user from api
    // // const res = await axios.get();
    // dispatch({
    //   type: GET_QUESTIONS,
    //   // payload: res.data,
    // });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <QuestionsContext.Provider
      value={{
        questions: state.questions,
        loading: state.loading,
        getQuestions,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsState;
