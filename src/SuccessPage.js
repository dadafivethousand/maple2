import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Stylesheets/SuccessPage.css';
import logo from './Media/whitelogonobg.webp';

export default function SuccessPage() {
  const { search } = useLocation();
  const isStore = new URLSearchParams(search).get('type') === 'store';

  return (
    <div className="success-page">
      <div className="success-content">
        <img className="sp-logo" src={logo} alt="Maple Jiu-Jitsu" />

        <svg className="checkmark" viewBox="0 0 52 52" aria-hidden="true">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__tick" fill="none" d="M14 27 l10 10 l14 -14" />
        </svg>

        <h1>Payment Successful</h1>
        <div className="sp-divider" />
        {isStore ? (
          <>
            <p>Thank you for your order!</p>
            <p>A receipt has been sent to your email.</p>
            <Link to="/store" className="back-button">← Back to Shop</Link>
          </>
        ) : (
          <>
            <p>Thank you for joining Maple Jiu-Jitsu!</p>
            <p>A receipt has been sent to your email.</p>
            <Link to="/#Pricing" className="back-button">← Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
