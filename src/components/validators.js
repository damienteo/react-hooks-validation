export const isRequired = config => value =>
  value === "" ? config.message : null;

export const isMinLength = config => value =>
  value.length < config.value ? config.message : null;
