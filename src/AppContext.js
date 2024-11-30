import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  // Retrieve initial values from localStorage or use defaults
  const getInitialState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };

  // State to control form visibility
  const [showForm, setShowForm] = useState(() => getInitialState("showForm", false));
  const [showKidForm, setShowKidForm] = useState(() => getInitialState("showKidForm", false));

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("showForm", JSON.stringify(showForm));
  }, [showForm]);

  useEffect(() => {
    localStorage.setItem("showKidForm", JSON.stringify(showKidForm));
  }, [showKidForm]);

  return (
    <AppContext.Provider value={{ showForm, setShowForm, showKidForm, setShowKidForm }}>
      {children}
    </AppContext.Provider>
  );
};
