export const useValidation = config => {
  return {
    errors: {},
    getFormProps: e => {
      console.log("getFormProps", e);
    },
    getFieldProps: fieldName => console.log("getFieldProps", fieldName)
  };
};
