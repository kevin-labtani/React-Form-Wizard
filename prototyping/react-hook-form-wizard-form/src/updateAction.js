export default function updateAction(state, payload) {
  return {
    ...state,
    yourDetails: {
      ...state.yourDetails,
      ...payload,
    },
  };
}
