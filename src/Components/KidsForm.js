import React, { useState, useEffect } from 'react';
import '../Stylesheets/KidsForm.css'; // Separate CSS file for this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../AppContext";
import pic from '../Media/img.png';

export default function KidsForm({ kidsFormData, setKidsFormData }) {
  const { setShowKidForm } = useAppContext();

  // Initialize state from localStorage or use default
 
  // Save state to localStorage whenever it changes
 
 

  const handleKidInputChange = (index, field, value) => {
    const updatedKids = [...kidsFormData];
    updatedKids[index][field] = value;
    setKidsFormData( updatedKids );
  };
  const addKid = () => {
    setKidsFormData(
      [...kidsFormData, { firstName: '', lastName: '', dob: '' }]
    );
  };


  const removeKid = (index) => {
    const updatedKids = kidsFormData.filter((_, i) => i !== index);
    setKidsFormData( updatedKids );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', kidsFormData);

    try {
      const response = await fetch('https://worker-consolidated.maxli5004.workers.dev/new_kids_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kidsFormData), // Send parentEmail and kids data
      });
  
      if (!response.ok) throw new Error('Failed to create session');
  
      const { url } = await response.json(); // Stripe Checkout URL
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    setKidsFormData({
      firstName: '',
      lastName: '',
      parentEmail: '',
      phone: '',
      membershipCode: 'basic',
      kids: [{ firstName: '', lastName: '', dob: '' }]
    });
    localStorage.removeItem('kidsFormData');
    setShowKidForm(false);
  };

  return (
  
      <div className="kids-form-container">
        <h3>Student's Info</h3>

     
        <form onSubmit={handleSubmit}>
    

          {kidsFormData.map((kid, index) => (
            <div key={index} className="kids-form">
              <div className='input-container'>
                <input
                  type="text"
                  className="kids-form-input"
                  placeholder=" First Name"
                  value={kid.firstName}
                  onChange={(e) => handleKidInputChange(index, 'firstName', e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="kids-form-input"
                  placeholder=" Last Name"
                  value={kid.lastName}
                  onChange={(e) => handleKidInputChange(index, 'lastName', e.target.value)}
                  required
                />

              </div>
              { kidsFormData.length > 1  &&
              <button
                type="button"
                id="kids-form-remove-button"
                onClick={() => removeKid(index)}
              >
                Remove
              </button>
              }
            </div>
          ))}

          <div className="kids-form-buttons">
            <button type="button" id="kids-form-add-button" onClick={addKid}>
             + Add
            </button>
   
          </div>
        </form>
      </div>
  );
}