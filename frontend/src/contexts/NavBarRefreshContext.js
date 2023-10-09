// NavBarRefreshContext.js
import React, { createContext, useState } from "react";

export const NavBarRefreshContext = createContext();

export const NavBarRefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <NavBarRefreshContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </NavBarRefreshContext.Provider>
  );
};
