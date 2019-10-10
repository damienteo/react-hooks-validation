import { useReducer, useMemo } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

import { validationReducer } from "./validationReducer";
import * as validators from "./validators";

//================================================================================
// Supporting Functions
//================================================================================

const validateField = (fieldValue = "", fieldConfig) => {
  const specialProps = ["initialValue"];

  for (let validatorName in fieldConfig) {
    if (specialProps.includes(validatorName)) continue;

    let validatorConfig = fieldConfig[validatorName];
    if (typeof validatorConfig === "string") {
      validatorConfig = { message: validatorConfig };
    }
    const configuredValidator = validators[validatorName](validatorConfig);
    const errorMessage = configuredValidator(fieldValue);

    if (errorMessage) return errorMessage;
  }
  return null;
};

const validateAllFields = (fieldValues, fieldConfigs) => {
  const errors = {};

  for (let fieldName in fieldConfigs) {
    const fieldConfig = fieldConfigs[fieldName];
    const fieldValue = fieldValues[fieldName];
    errors[fieldName] = validateField(fieldValue, fieldConfig);
  }

  return errors;
};

const getErrors = (state, config) => {
  switch (config.showErrors) {
    case "always":
      return state.errors;
    case "onBlur":
      if (state.submit) return state.errors;
      return Object.entries(state.blurred)
        .filter(([, blurred]) => blurred)
        .reduce(
          (accumulator, [name]) => ({
            ...accumulator,
            [name]: state.errors[name]
          }),
          {}
        );
    default:
      return state.submit ? state.errors : {};
  }
};

const getInitialState = config => {
  if (typeof config === "function") {
    config = config({});
  }

  const initialValues = {};
  const initialBlurred = {};
  for (let fieldName in config.fields) {
    initialValues[fieldName] = config.fields[fieldName].initialValue || "";
    initialBlurred[fieldName] = false;
  }

  const initialErrors = validateAllFields(initialValues, config.fields);

  return {
    values: initialValues,
    errors: initialErrors,
    blurred: initialBlurred,
    submit: false
  };
};

//================================================================================
// useValidation
//================================================================================

const useValidation = config => {
  const [state, dispatch] = useReducer(
    validationReducer,
    getInitialState(config)
  );

  if (typeof config === "function") {
    config = config(state.values);
  }

  useDeepCompareEffect(() => {
    dispatch({
      type: "change",
      payload: getInitialState(config).values
    });

    const errors = validateAllFields(state.values, config.fields);
    dispatch({ type: "validate", payload: errors });
  }, [state.values, config.fields]);

  const errors = useMemo(() => getErrors(state, config), [state, config]);

  const hasNoErrors = useMemo(
    () => Object.values(errors).every(error => error === null),
    [errors]
  );
  const hasUserTouchedForm = useMemo(
    () =>
      Object.values(state.blurred).filter(value => value === true).length > 0,
    [state.blurred]
  );
  // const isFormValid = Boolean(hasNoErrors && hasUserTouchedForm);
  const isFormValid = Boolean(hasNoErrors);

  return {
    errors,
    isFormValid,
    getFormProps: () => ({
      onSubmit: e => {
        e.preventDefault();
        dispatch({ type: "submit" });
        if (isFormValid && config.onSubmit) {
          config.onSubmit();
        }
      }
    }),
    getFieldProps: (fieldName, overrides = {}) => ({
      onChange: e => {
        let value;
        if (e.target) value = e.target.value;
        else value = e.target;

        if (!config.fields[fieldName]) {
          return;
        }
        dispatch({
          type: "change",
          payload: { [fieldName]: value }
        });
        if (overrides.onChange) {
          overrides.onChange(e);
        }
      },
      onBlur: e => {
        dispatch({ type: "blur", payload: fieldName });
      },
      name: fieldName,
      value: state.values[fieldName],
      "aria-invalid": String(!!errors[fieldName])
    })
  };
};

export default useValidation;
