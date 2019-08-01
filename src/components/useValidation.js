import { useReducer, useMemo } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

import { validationReducer } from "./validationReducer";
import { validateFields } from "./validateField";

const initialState = {
  values: {},
  blurred: {},
  errors: {},
  submittedErrors: {},
  blurredErrors: {},
  submitted: false
};

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState);

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, config.fields);
    dispatch({ type: "validate", payload: errors });
  }, [state.values, config.fields]);

  const blurredErrors = useMemo(() => {
    const returnValue = {};
    for (let fieldName in state.Errors) {
      returnValue[fieldName] = state.blurred[fieldName]
        ? state.errors[fieldName]
        : null;
    }
    return returnValue;
  }, [state.errors, state.blurred]);

  return {
    errors: state.errors,
    blurredErrors,
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
      onBlur: () => {
        dispatch({ type: "blur", payload: fieldName });
      },
      name: fieldName,
      value: state.values[fieldName]
    })
  };
};
