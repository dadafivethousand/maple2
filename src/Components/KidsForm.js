import React, { useState, useEffect } from 'react';
import '../Stylesheets/KidsForm.css'; // Separate CSS file for this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../AppContext";
import pic from '../Media/img.png';

export default function KidsForm() {
  const { setShowKidForm } = useAppContext();

  // Initialize state from localStorage or use default
  const getInitialKids = () => {
    const storedKids = localStorage.getItem('kids');
    return storedKids ? JSON.parse(storedKids) : [{ firstName: '', lastName: '', dob: '' }];
  };

  const [kids, setKids] = useState(getInitialKids);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kids', JSON.stringify(kids));
  }, [kids]);

  const handleInputChange = (index, field, value) => {
    const updatedKids = [...kids];
    updatedKids[index][field] = value;
    setKids(updatedKids);
  };

  const addKid = () => {
    setKids([...kids, { firstName: '', lastName: '', dob: '' }]);
  };

  const removeKid = (index) => {
    const updatedKids = kids.filter((_, i) => i !== index);
    setKids(updatedKids);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting kids data:', kids);

    try {
      const response = await fetch('https://your-worker-url.workers.dev/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kids }), // Send kids data
      });
  
      if (!response.ok) throw new Error('Failed to create session');
  
      const { url } = await response.json(); // Stripe Checkout URL
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error submitting kids data:', error);
    }
    setKids([{ firstName: '', lastName: '', dob: '' }]);
    localStorage.removeItem('kids');
    setShowKidForm(false);
  };

  return (
    <div className="kids-form-outer-container">
      <div className="kids-form-container">
        <div className="kids-form-close" onClick={() => setShowKidForm(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <img className="pic" src={pic} alt="Icon" />

      
        <p>Please fill out for each child</p>
        <form onSubmit={handleSubmit}>
          {kids.map((kid, index) => (
            <div key={index} className="kids-form">
              <div>
                <div>
                  <input
                    type="text"
                    className="kids-form-input"
                    placeholder="Child's First Name"
                    value={kid.firstName}
                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="kids-form-input"
                    placeholder=" Child's  Last Name"
                    value={kid.lastName}
                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className='kids-form-dob'>
                    <p>Date of Birth:</p>
                  <input
                    type="date"
                    className="kids-form-input"
                    placeholder="Date of Birth"
                    value={kid.dob}
                    onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                    required
                  />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="kids-form-remove-button"
                onClick={() => removeKid(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className='kids-form-buttons'>
          <button type="button" className="kids-form-add-button" onClick={addKid}>
            Add Child
          </button>
          <button type="submit" className="kids-form-submit-button">
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
