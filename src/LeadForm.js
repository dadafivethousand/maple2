import React, { useState, useEffect } from 'react';
import './Stylesheets/LeadForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppContext } from "./AppContext";
import pic from './Media/img.png'
export default function LeadForm() {
  const { setShowForm } = useAppContext();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  // Default to Ontario
  });

  const [message, setMessage] = useState(null); // To display success/error messages
  const [isValid, setIsValid] = useState(false); // To track if the form is valid

  const handleCaptchaChange = (token) => {
    if (token) {
      setCaptchaVerified(true); // Enable the submit button when CAPTCHA is verified
    } else {
      setCaptchaVerified(false); // Disable it if something goes wrong
    }
  };

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
      cleanedPhone.length === 10 &&
      captchaVerified === true;

    setIsValid(isFormValid);
  }, [formData, captchaVerified]);

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsValid(false)
    if (!isValid) return; // Prevent submission if form is not valid
    console.log('sending request to worker')
    try {
      const response = await fetch('https://captcha.maxli5004.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\D/g, ''), // Send only digits to the backend
        }),  
        mode: 'cors', // Explicitly set the mode to 'cors'
       });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); 
        setMessage(
          
          <>
            <p className="message-title">Success!</p>
<p className="message-body top"> Someone from our team will be reaching out to you shortly. </p>
   <p className="message-body"> In the meantime, please complete the waiver by <a href='https://waiver.smartwaiver.com/w/dj188118umjqr7iwcr7jfq/web/'>following this link</a>. </p> 
             <img className='small-pic' src={pic} />
          </>
        );
        console.log('Success:', result);

        // Reset the form after a successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
 
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
    <div  className="form-outer-container">
    <div  className="form-container">
    
    <div className='close-form' onClick={()=>setShowForm(false)}> <FontAwesomeIcon icon={faTimes} />
    </div> 
      {message ? (
        <div className='message-container'>
        {message}

        </div>
      ) : (
        <>
          <img className='small-pic' src={pic} />
     <h2>Free Trial Class Signup</h2> 
           <form onSubmit={handleSubmit}>
            <div className='grid'>
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
            </div>
            {/* Google reCAPTCHA widget */}
            <div className='captcha-container'>
            <div className='captcha'>
            <ReCAPTCHA
              id="center"
              className="recaptcha"
              sitekey="6LfVmFoqAAAAAF811UKiqels-ToHS8VlodkDiS6G"
              onChange={handleCaptchaChange}
            />
            </div>
            </div>
            <button
              
              type="submit"
              className={isValid ? 'valid-button' : 'invalid-button'}
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
    </div>
  );
}
