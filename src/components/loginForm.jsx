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
  const { getFieldProps, getFormProps, errors } = useValidation(config);
  return (
    <form {...getFormProps()}>
      <h1>LoginForm</h1>
      <div>
        <label>
          Username
          <br /> <input {...getFieldProps("username")} />
          {errors.username && <div>Error: {errors.username}</div>}
        </label>
      </div>
      <div>
        <label>
          Password
          <br /> <input type="password" {...getFieldProps("password")} />
          {errors.password && <div>Error: {errors.password}</div>}
        </label>
      </div>
      <button type="submit">Submit my Form</button>
    </form>
  );
};

export default LoginForm;
