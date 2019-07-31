import { useReducer } from "react";
import { validationReducer } from "./validationReducer";

const initialState = {
  values: {},
  errors: {},
  submitted: false
};

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState);
  return {
    errors: state.errors,
    getFormProps: e => {
      console.log("getFormProps", e);
    },
    getFieldProps: fieldName => ({
      onChange: e => {
        console.log("getFieldProps", fieldName);
        if (!config.fields[fieldName]) {
          return;
        }
        dispatch({
          type: "change",
          payload: { [fieldName]: e.target.value }
        });
      },
      name: fieldName,
      value: state.values[fieldName]
    })
  };
};
