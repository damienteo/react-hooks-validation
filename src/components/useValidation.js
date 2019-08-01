import { useReducer, useMemo } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

import { validationReducer } from "./validationReducer";
import { validateFields } from "./validateField";

const initialState = {
  values: {},
  blurred: {},
  errors: {},
  submitted: false
};

function getErrors(state, config) {
  switch (config.showErrors) {
    case "always":
      return state.errors;
    case "blur":
      return Object.entries(state.blurred)
        .filter(([, blurred]) => blurred)
        .reduce((acc, [name]) => ({ ...acc, [name]: state.errors[name] }), {});
    default:
      return state.submitted ? state.errors : {};
  }
}

//   const blurredErrors = useMemo(() => {
//     const returnValue = {};
//     for (let fieldName in state.errors) {
//       returnValue[fieldName] = state.blurred[fieldName]
//         ? state.errors[fieldName]
//         : null;
//     }
//     return returnValue;
//   }, [state.errors, state.blurred]);

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState);

  if (typeof config === "function") {
    config = config(state.values);
  }

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, config.fields);
    dispatch({ type: "validate", payload: errors });
  }, [state.values, config.fields]);

  const errors = useMemo(() => getErrors(state, config), [state, config]);

  return {
    errors,
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
        console.log("getFieldProps", e.target);
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
