import { GET_QUESTIONS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
