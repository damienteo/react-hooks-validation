import React from "react";

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
  return <div>LoginForm</div>;
};

export default LoginForm;
