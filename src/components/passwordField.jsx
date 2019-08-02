import React, { useContext } from "react";
import { ValidationContext, ValidationProvider } from "./validationContext";

const PasswordField = () => {
  const { getFieldProps, getFormProps, errors } = useContext(ValidationContext);
  console.log("vlaidationcontext", ValidationContext);
  console.log("context in oginform", useContext(ValidationContext));
  return (
    <label>
      Password
      <br /> <input type="password" {...getFieldProps("password")} />
      {errors.password && <div>Error: {errors.password}</div>}
    </label>
  );
};

export default PasswordField;
