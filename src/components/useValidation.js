import { useReducer, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

import { validationReducer } from "./validationReducer";
import { validateFields } from "./validateField";

const initialState = {
  values: {},
  errors: {},
  submittedErrors: {},
  submitted: false
};

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState);

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, config.fields);
    dispatch({ type: "validate", payload: errors });
  }, [state.values, config.fields]);

  return {
    errors: state.errors,
    submittedErrors: state.submitted ? state.errors : {},
    getFormProps: () => ({
      onSubmit: e => {
        console.log("getFormProps", e);
        e.preventDefault();
        dispatch({ type: "submit" });
        if (config.onSubmit) {
          config.onSubmit(state);
        }
      }
    }),
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
