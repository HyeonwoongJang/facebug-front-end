import React, { useContext } from "react";
import { IsLoginContext } from "./IsLoginContext";

const IsLoginProvider = ({ children }) => {
  const context = useContext(IsLoginContext);

  return (
    <IsLoginContext.Provider value={context}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginProvider;
