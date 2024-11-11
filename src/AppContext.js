import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  return (
    <AppContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </AppContext.Provider>
  );
};
