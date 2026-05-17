import React from 'react';
import { Link } from 'react-router-dom';
import './Stylesheets/CancelPage.css';
import logo from './Media/whitelogonobg.webp';

export default function CancelPage() {
  return (
    <div className="cancel-page">
      <div className="cancel-content">
        <img className="sp-logo" src={logo} alt="Maple Jiu-Jitsu" />

        <svg className="cancelmark" viewBox="0 0 52 52" aria-hidden="true">
          <circle className="cancelmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="cancelmark__line1" d="M16 16 L36 36" fill="none" />
          <path className="cancelmark__line2" d="M36 16 L16 36" fill="none" />
        </svg>

        <h1>Payment Failed</h1>
        <div className="cp-divider" />
        <p>Your card was not charged.</p>
        <p className="cp-note">Something went wrong — please try again or contact us.</p>

        <div className="cp-actions">
          <Link to="/#Pricing" className="cancel-back-button">Try Again</Link>
          <Link to="/#Contact" className="cp-ghost-btn">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
