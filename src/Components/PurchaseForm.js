import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // Stripe imports
import '../Stylesheets/Purchase.css';

export default function PurchaseForm() {
  const { formData, setFormData } = useAppContext();
  const [errors, setErrors] = useState({});
  const stripe = useStripe();
  const elements = useElements();

  // Handle input change and update context state
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const cleanedPhone = value.replace(/\D/g, '');
      let formattedPhone = cleanedPhone;
      if (cleanedPhone.length > 3 && cleanedPhone.length <= 6) {
        formattedPhone = `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3)}`;
      } else if (cleanedPhone.length > 6) {
        formattedPhone = `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3, 6)}-${cleanedPhone.slice(6, 10)}`;
      }
      setFormData({ ...formData, phoneNumber: formattedPhone });
    } 
    else if (name === 'birthDate') {
      const cleanedDOB = value.replace(/\D/g, ''); // Remove non-digits
      let formattedDOB = cleanedDOB;
      if (cleanedDOB.length > 2 && cleanedDOB.length <= 4) {
        formattedDOB = `${cleanedDOB.slice(0, 2)}-${cleanedDOB.slice(2)}`;
      } else if (cleanedDOB.length > 4) {
        formattedDOB = `${cleanedDOB.slice(0, 2)}-${cleanedDOB.slice(2, 4)}-${cleanedDOB.slice(4, 8)}`;
      }
      setFormData({ ...formData, birthDate: formattedDOB });
    } else {   
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Custom validation for phone number, DOB, and postal code
  const validateForm = () => {
    const newErrors = {};
    const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    const dobPattern = /^\d{2}-\d{2}-\d{4}$/; // DD-MM-YYYY
    const postalPattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

    // Validate phone number
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be in the format (123) 456-7899';
    }

    // Validate DOB (check format and ensure the date is valid)
    if (!dobPattern.test(formData.birthDate)) {
      newErrors.birthDate = 'Date of birth must be in DD-MM-YYYY format';
    } else {
      const [day, month, year] = formData.birthDate.split('-').map(Number);
      if (month < 1 || month > 12) {
        newErrors.birthDate = 'Month must be between 01 and 12';
      }
      if (day < 1 || day > 31) {
        newErrors.birthDate = 'Day must be between 01 and 31';
      }
    }

    // Validate postal code
    if (!postalPattern.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be in A1A1A1 format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission with Stripe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    if (validateForm()) {
      const cardElement = elements.getElement(CardElement);

      // Use Stripe to create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
      } else {
        console.log('Payment method created:', paymentMethod);
        // Process the form data (if valid) and payment
        console.log('Form submitted:', formData);
        // Send the paymentMethod.id to your backend for further processing (e.g., create PaymentIntent)
      }
    } else {
      console.log('Form has errors, not submitted');
    }
  };

  return (
    <div className='purchase-form-container'>
      <form onSubmit={handleSubmit}>
        <div className="purchase-form">
          <div className='grid-form'>
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone number*</label>
              <input
                type="tel"
                placeholder="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
               />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>
            <div className="form-group">
              <label>Birth Date (dd-mm-yyyy)*</label>
              <input
                type="text"
                placeholder="DD-MM-YYYY"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
              {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            </div>
          </div>
        </div>

        <div className="purchase-form">
          <div className='grid-form'>
            <div className="form-group">
              <label>Address*</label>
              <input
                type="text"
                placeholder="Building #, Street/Ave"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Unit / Apartment #</label>
              <input
                type="text"
                placeholder="Unit / Apartment #"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City / Town*</label>
              <input
                type="text"
                placeholder="City / Town"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className='field-flex'>
              <div className="form-group half">
                <label>Province*</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                >
                  <option value="ON">ON</option>
                  <option value="QC">QC</option>
                  <option value="BC">BC</option>
                  <option value="AB">AB</option>
                  <option value="MB">MB</option>
                  <option value="SK">SK</option>
                  <option value="NB">NB</option>
                  <option value="NL">NL</option>
                  <option value="NS">NS</option>
                  <option value="PE">PE</option>
                  <option value="NT">NT</option>
                  <option value="NU">NU</option>
                  <option value="YT">YT</option>
                </select>
              </div>

              <div className="form-group half">
                <label>Postal Code*</label>
                <input
                  type="text"
                  placeholder="A1A1A1"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d"
                />
                {errors.postalCode && <p className="error">{errors.postalCode}</p>}
              </div>
            </div>

            {/* Credit Card Section */}
            <div className="form-group wide">
              <label>Credit Card Information*</label>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',  // Set the base font size
                      color: '#32325d',  // Change the base text color
                      backgroundColor: '#f8f8f8',  // Change background color
                      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',  // Customize the font
                      '::placeholder': {
                        color: '#aab7c4',  // Customize placeholder color
                      },
                    },
                    invalid: {
                      color: '#fa755a',  // Customize the color of invalid input
                      iconColor: '#fa755a',  // Customize the color of the card icon in case of an error
                    },
                    complete: {
                      color: '#4caf50',  // Customize the color when card details are valid (optional)
                    },
                  },
                }}
              />

              {errors.card && <p className="error">{errors.card}</p>}
            </div>

          </div>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
