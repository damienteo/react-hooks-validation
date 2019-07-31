export function validationReducer(state, action) {
  switch (action.type) {
    case "change":
      console.log("state", state);
      console.log("action", action);
      const values = { ...state.values, ...action.payload };
      return {
        ...state,
        values
      };
    case "submit":
      return { ...state, submitted: true };
    default:
      throw new Error("Unknown action type");
  }
}
