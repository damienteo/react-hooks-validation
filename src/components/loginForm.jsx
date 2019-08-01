import React from "react";

import { useValidation } from "./useValidation";

const config = {
  fields: {
    username: {
      isRequired: { message: "Please fill out a username" }
    },
    password: {
      isRequired: { message: "Please fill out a password" },
      isMinLength: { value: 6, message: "Please make it more secure" }
    }
  },
  onSubmit: e => {
    return null;
  }
};

const LoginForm = () => {
  const {
    getFieldProps,
    getFormProps,
    errors,
    submittedErrors
  } = useValidation(config);
  return (
    <form {...getFormProps()}>
      <h1>LoginForm</h1>
      <div>
        <label>
          Username
          <br /> <input {...getFieldProps("username")} />
          {submittedErrors.username && (
            <div>Error: {submittedErrors.username}</div>
          )}
        </label>
      </div>
      <div>
        <label>
          Password
          <br /> <input type="password" {...getFieldProps("password")} />
          {submittedErrors.password && (
            <div>Error: {submittedErrors.password}</div>
          )}
        </label>
      </div>
      <button type="submit">Submit my Form</button>
    </form>
  );
};

export default LoginForm;
