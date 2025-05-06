// SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Stylesheets/SuccessPage.css';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-content">
        <svg
          className="checkmark"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__tick"
            fill="none"
            d="M14 27 l10 10 l14 -14"
          />
        </svg>

        <h1>Payment Successful!</h1>
        <p>Thank you for joining Maple Jiu-Jitsu</p>
        <Link to="/#Pricing" className="back-button">
          Back to Home
        </Link>
      </div>
    </div>
);
}
