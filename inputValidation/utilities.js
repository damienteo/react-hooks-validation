export const INVALID_TYPE = "Invalid type, see console for details.";

export const isObjectLike = value =>
  !isNull(value) && typeof value === "object";

export const objectToTag = obj => Object.prototype.toString.call(obj);

export const functionToTag = func => Function.prototype.toString.call(func);

export const typeToString = type =>
  isFunction(type)
    ? functionToTag(type).match(/^function (\w+)/)[1]
    : objectToTag(type).match(/^\[object (\w+)/)[1];

export const isString = value =>
  typeof value === "string" ||
  (isObjectLike(value) && objectToTag(value) === "[object String]");

export const isArray = value => Array.isArray(value);

export const isFunction = value => typeof value === "function";

export const isObject = value => {
  if (!isObjectLike(value) || objectToTag(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(Object(value));

  if (isNull(prototype)) {
    return true;
  }

  const Ctor =
    Object.prototype.hasOwnProperty.call(prototype, "constructor") &&
    prototype.constructor;

  return (
    isFunction(Ctor) &&
    Ctor instanceof Ctor &&
    functionToTag(Ctor) === functionToTag(Object)
  );
};

export const isNumber = value =>
  (typeof value === "number" ||
    (isObjectLike(value) && objectToTag(value) === "[object Number]")) &&
  !isNaN(value);

export const isBoolean = value =>
  typeof value === "boolean" ||
  (isObjectLike(value) && objectToTag(value) === "[object Boolean]");

export const isEmptyString = value =>
  isString(value) && value.trim().length === 0;

export const isNil = value => isNull(value) || isUndefined(value);

export const isNull = value => value === null;

export const isUndefined = value => value === undefined;

export const Types = Object.freeze({
  array: Array,
  boolean: Boolean,
  function: Function,
  null: null,
  number: Number,
  object: Object,
  string: String,
  undefined: undefined
});

export const getType = value =>
  Object.entries({
    array: isArray,
    boolean: isBoolean,
    function: isFunction,
    null: isNull,
    number: isNumber,
    object: isObject,
    string: isString,
    undefined: isUndefined
  }).reduce(
    (type, [key, isType]) =>
      type !== false || !isType(value) ? type : Types[key],
    false
  );

export const isInvalidType = (value, validTypes) => {
  const type = getType(value);
  const isValid = validTypes.includes(type);

  console.log(
    isValid,
    'Invalid value type "%s", expected value type%s: %s',
    typeToString(type),
    validTypes.length > 1 ? "s" : "",
    validTypes.map(typeToString).join(", ")
  );

  return !isValid && process.env.NODE_ENV !== "production"
    ? INVALID_TYPE
    : null;
};
