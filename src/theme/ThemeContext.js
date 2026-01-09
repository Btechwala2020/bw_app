import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  const theme = {
    dark,
    background: dark ? "#020617" : "#f8fafc",
    navbar: dark ? "#0b0f1a" : "#ffffff",
    text: dark ? "#ffffff" : "#020617",
    icon: dark ? "#ffffff" : "#020617",
  };

  return (
    <ThemeContext.Provider value={{ theme, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
