import React, { useState, useEffect } from 'react';
import './Stylesheets/FoundersForm.css';

export default function FoundersForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    province: 'ON', // Default to Ontario
  });

  const [message, setMessage] = useState(null); // To display success/error messages
  const [isValid, setIsValid] = useState(false); // To track if the form is valid

  // Email validation function using regular expression
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes, and format/validate phone number
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Remove all non-digit characters
      const cleanedPhone = value.replace(/\D/g, '');

      // Apply the format (123) 456-7890
      let formattedPhone = cleanedPhone;
      if (cleanedPhone.length > 3 && cleanedPhone.length <= 6) {
        formattedPhone = `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3)}`;
      } else if (cleanedPhone.length > 6) {
        formattedPhone = `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3, 6)}-${cleanedPhone.slice(6, 10)}`;
      }

      // Update formData with the formatted phone number
      setFormData({ ...formData, phone: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate the form fields
  useEffect(() => {
    // Clean the phone number (remove formatting) to validate its length
    const cleanedPhone = formData.phone.replace(/\D/g, '');

    // Ensure all required fields are filled, phone has exactly 10 digits, and email is valid
    const isFormValid =
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      validateEmail(formData.email) &&
      cleanedPhone.length === 10;

    setIsValid(isFormValid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return; // Prevent submission if form is not valid
    try {
      const response = await fetch('http://localhost:5000/api/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\D/g, ''), // Send only digits to the backend
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(
          <>
            <p className="message-title">Form Submitted Successfully.</p>
            <p className="message-body">We will be in touch soon. <br></br> Thank you for your patience.</p>
          </>
        );
        console.log('Success:', result);

        // Reset the form after a successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          streetAddress: '',
          city: '',
          postalCode: '',
          province: 'ON', // Reset to default province
        });
      } else {
        const errorData = await response.json();
        setMessage(<p className="error-message">Error: {errorData.message}</p>);
        console.error('Error:', errorData);
      }
    } catch (error) {
      setMessage(<p className="error-message">Error submitting the form</p>);
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      {message ? (
        message
      ) : (
        <>
          <h2>50% OFF EARLY BIRD SPECIAL</h2>
          <p>Reserve your spot. Spaces are limited!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>

            <button
              type="submit"
              className={isValid ? 'valid-button' : 'invalid-button'}
              disabled={!isValid} // Disable button if form is not valid
            >
              Claim Discount
            </button>
          </form>
        </>
      )}
    </div>
  );
}
