import React, { useContext } from "react";

import { useValidation } from "./useValidation";
import { ValidationContext, ValidationProvider } from "./validationContext";
import PasswordField from "./passwordField";

const config = fields => ({
  fields: {
    username: {
      isRequired: "Please fill out a username"
    },
    password: {
      isRequired: "Please fill out a password",
      isMinLength: { value: 6, message: "Please make it more secure" }
    },
    repeatPassword: {
      isRequired: "Please fill out a password",
      isMinLength: { value: 6, message: "Please make it more secure" },
      isEqual: {
        value: fields.password,
        message: "Your passwords don’t match"
      }
    }
  },
  showErrors: "blur",
  onSubmit: e => {
    console.log("onSubmit", e);
    if (e.isFormValid) console.log("Form is valid");
    else console.log("errors present");
  }
});

const LoginForm = () => {
  const { getFieldProps, getFormProps, errors } = useValidation(config);

  return (
    <ValidationProvider config={config}>
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
          <PasswordField />
        </div>
        <div>
          <label>
            Repeat Password
            <br />{" "}
            <input type="password" {...getFieldProps("repeatPassword")} />
            {errors.repeatPassword && <div>Error: {errors.repeatPassword}</div>}
          </label>
        </div>
        <button type="submit">Submit my Form</button>
      </form>
    </ValidationProvider>
  );
};

export default LoginForm;
