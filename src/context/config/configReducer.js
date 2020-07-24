import { GET_CONFIG, CONFIG_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return {
        ...state,
        config: action.payload,
        errorLoadingConfig: false,
        loadingConfig: false,
      };
    case CONFIG_ERROR:
      return {
        ...state,
        errorLoadingConfig: true,
        loadingConfig: false,
      };
    default:
      return state;
  }
};
