import React, { useContext } from "react";
import { ValidationContext } from "./validationContext";

const PasswordField = () => {
  const { getFieldProps, errors } = useContext(ValidationContext);
  return (
    <label>
      Password
      <br /> <input type="password" {...getFieldProps("password")} />
      {errors.password && <div>Error: {errors.password}</div>}
    </label>
  );
};

export default PasswordField;
