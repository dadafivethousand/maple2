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
  const [showAdult, setShowAdult] = useState(() => getInitialState("showAdult", false));
  const [showKid, setShowKid] = useState(() => getInitialState("showKid", false));
  const [showPrivate, setShowPrivate] = useState(() => getInitialState("showPrivate", false));
  const [showPizduq, setShowPizduq] = useState(() => getInitialState("showPizduq", false));

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("showForm", JSON.stringify(showForm));
  }, [showForm]);

  useEffect(() => {
    localStorage.setItem("showKidForm", JSON.stringify(showKidForm));
  }, [showKidForm]);


  useEffect(() => {
    localStorage.setItem("showAdult", JSON.stringify(showAdult));
  }, [showAdult]);

  useEffect(() => {
    localStorage.setItem("showKid", JSON.stringify(showKid));
  }, [showKid]);

  useEffect(() => {
    localStorage.setItem("showPrivate", JSON.stringify(showPrivate));
  }, [showPrivate]);

  useEffect(() => {
    localStorage.setItem("showPizduq", JSON.stringify(showPizduq));
  }, [showPizduq]);

  return (
    <AppContext.Provider value={{ showForm, showPizduq, setShowPizduq, setShowForm, showKidForm, setShowKidForm, showAdult, setShowAdult, showKid, setShowKid, showPrivate, setShowPrivate }}>
      {children}
    </AppContext.Provider>
  );
};
