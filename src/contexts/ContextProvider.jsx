import React, { createContext, useState } from 'react';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentColor, setCurrentColor] = useState(''); // Colocar el valor inicial del color según corresponda
  const [currentMode, setCurrentMode] = useState(''); // Colocar el valor inicial del modo según corresponda

  return (
    <AppContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        themeSettings,
        setThemeSettings,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
