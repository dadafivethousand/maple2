import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  // Load initial values from localStorage (or default to null if nothing is stored)
  const [price, setPrice] = useState(() => {
    return localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : null;
  });
  const [type, setType] = useState(() => {
    return localStorage.getItem('type') ? JSON.parse(localStorage.getItem('type')) : null;
  });
  const [frequency, setFrequency] = useState(() => {
    return localStorage.getItem('frequency') ? JSON.parse(localStorage.getItem('frequency')) : null;
  });

  // Form data state
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      address: '',
      unit: '',
      city: '',
      province: 'ON', // Default province
      postalCode: ''
    };
  });

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('price', JSON.stringify(price));
  }, [price]);

  useEffect(() => {
    localStorage.setItem('type', JSON.stringify(type));
  }, [type]);

  useEffect(() => {
    localStorage.setItem('frequency', JSON.stringify(frequency));
  }, [frequency]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <AppContext.Provider value={{ 
      price, setPrice, 
      type, setType, 
      frequency, setFrequency, 
      formData, setFormData 
    }}>
      {children}
    </AppContext.Provider>
  );
};
