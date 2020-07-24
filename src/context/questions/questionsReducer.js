import { GET_QUESTIONS, QUESTION_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        errorLoadingQuestions: false,
        loadingQuestions: false,
      };
    case QUESTION_ERROR:
      return {
        ...state,
        errorLoadingQuestions: true,
        loadingQuestions: false,
      };
    default:
      return state;
  }
};
