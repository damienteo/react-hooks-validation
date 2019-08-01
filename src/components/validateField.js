import * as validators from "./validators";

function validateField(fieldValue = "", fieldConfig) {
  for (let validatorName in fieldConfig) {
    let validatorConfig = fieldConfig[validatorName];
    if (typeof validatorConfig === "string") {
      validatorConfig = { message: validatorConfig };
    }

    const configuredValidator = validators[validatorName](validatorConfig);
    const errorMessage = configuredValidator(fieldValue);

    if (errorMessage) return errorMessage;
  }
  return null;
}

export function validateFields(fieldValues, fieldConfigs) {
  const errors = {};
  for (let fieldName in fieldConfigs) {
    const fieldConfig = fieldConfigs[fieldName];
    const fieldValue = fieldValues[fieldName];
    errors[fieldName] = validateField(fieldValue, fieldConfig);
  }
  return errors;
}
