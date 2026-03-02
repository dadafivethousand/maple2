import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(() => {
    try {
      const storedValue = localStorage.getItem("showForm");
      return storedValue !== null ? JSON.parse(storedValue) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("showForm", JSON.stringify(showForm));
  }, [showForm]);

  return (
    <AppContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </AppContext.Provider>
  );
};
