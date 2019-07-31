import { useReducer, useEffect } from "react";
import { validationReducer } from "./validationReducer";
import { validateFields } from "./validateField";

const initialState = {
  values: {},
  errors: {},
  submitted: false
};

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState);
  console.log("config in useValidation", config);

  useEffect(() => {
    const errors = validateFields(state.fields, config.fields);
    dispatch({ type: "validate", payload: errors }, [
      state.fields,
      config.fields
    ]);
  });

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
