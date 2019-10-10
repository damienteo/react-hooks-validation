import React from "react";
import { useValidation } from "./useValidation";

export const ValidationContext = React.createContext({});

export const ValidationProvider = ({ config, children }) => {
  const context = useValidation(config);
  return (
    <ValidationContext.Provider value={context}>
      {children}
    </ValidationContext.Provider>
  );
};
