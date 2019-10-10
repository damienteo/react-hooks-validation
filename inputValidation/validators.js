import {
  isNil,
  isEmptyString,
  isString,
  Types,
  isInvalidType
} from "./utilities";

export const isRequired = config => value =>
  isNil(value) || isEmptyString(value) ? config.message : null;

export const isMinLength = config => value =>
  value.length < config.value ? config.message : null;

export const isCertainLength = config => value =>
  value.length !== config.value ? config.message : null;

export const isEqual = config => value =>
  value !== config.value ? config.message : null;

export const isNumber = config => value =>
  isNaN(+value) ? config.message : null;

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isEmail = config => value => {
  if (isString(value)) {
    return !EMAIL_REGEXP.test(value) ? config.message : null;
  }
  return isInvalidType(value, [Types.string]);
};
