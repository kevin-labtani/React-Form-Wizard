import { GET_QUESTIONS, QUESTION_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        errorLoading: false,
        loading: false,
      };
    case QUESTION_ERROR:
      return {
        ...state,
        errorLoading: true,
        loading: false,
      };
    default:
      return state;
  }
};
