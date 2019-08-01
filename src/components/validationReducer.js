export function validationReducer(state, action) {
  switch (action.type) {
    case "change":
      const values = { ...state.values, ...action.payload };
      return {
        ...state,
        values
      };
    case "blur":
      const blurred = { ...state.blurred, [action.payload]: true };
      return {
        ...state,
        blurred
      };
    case "validate":
      return { ...state, errors: action.payload };
    case "submit":
      return { ...state, submitted: true };
    default:
      throw new Error("Unknown action type");
  }
}
