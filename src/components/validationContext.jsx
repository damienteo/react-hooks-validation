import React from "react";
import { useValidation } from "./useValidation";

export const ValidationContext = React.createContext({});

export const ValidationProvider = ({ config, children }) => {
  console.log("config in context", config);
  const context = useValidation(config);
  console.log("context from useValdiation", context);
  return (
    <ValidationContext.Provider value={context}>
      {children}
    </ValidationContext.Provider>
  );
};
