import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  const
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  [price, setPrice] = useState(null);  // Store selected price
  const [type, setType] = useState(null); 
  const [frequency, setFrequency] = useState(null); 
  return (
    <AppContext.Provider value={{ price, setPrice, type, setType, frequency, setFrequency}}>
      {children}
    </AppContext.Provider>
  );
};
