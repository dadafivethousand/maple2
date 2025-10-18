import React, { useState, useEffect } from 'react';
import './Stylesheets/LeadForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppContext } from "./AppContext";
import bluelogo from "./Media/whitelogonobg.png";
import AnimatedCheckmark from './Components/AnimatedCheckmark';
import TypewriterCycle from './Utils/Typewriter';

export default function LeadForm({ closebutton }) {
  const { setShowForm } = useAppContext();

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // UI state
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [showInstructions, setShowInstructions] = useState(false);
  const [fadeOutCheck, setFadeOutCheck] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleCaptchaChange = (token) => setCaptchaVerified(Boolean(token));

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 3 && cleaned.length <= 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else if (cleaned.length > 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
      setFormData((p) => ({ ...p, phone: formatted }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // Form validity
  useEffect(() => {
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const ok =
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      validateEmail(formData.email) &&
      cleanedPhone.length === 10 &&
      captchaVerified;
    setIsValid(ok);
  }, [formData, captchaVerified]);

  // After success: show checkmark, fade it, then swap to instructions
  useEffect(() => {
    if (status !== 'success') return;
    setShowInstructions(false);
    setFadeOutCheck(false);

    const fadeTimer = setTimeout(() => setFadeOutCheck(true), 1200);   // start fade
    const swapTimer = setTimeout(() => setShowInstructions(true), 1900); // swap to instructions

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(swapTimer);
    };
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch(
        'https://worker-consolidated.maxli5004.workers.dev/intake-form',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({
            ...formData,
            phone: formData.phone.replace(/\D/g, ''),
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        setErrorMsg(err?.message || 'Unexpected error');
        setStatus('error');
        return;
      }

      // success
      await response.json().catch(() => ({}));
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (err) {
      setErrorMsg('Error submitting the form');
      setStatus('error');
    }
  };

  const showFormUI = status === 'idle' || status === 'submitting' || status === 'error';

  return (
    <div className="form-outer-container">
      <div className={`form-container ${status === 'success' && 'blue-bg'} `}>
        {closebutton ? (
          <div
            className={`close-form`}
            onClick={() => setShowForm(false)}
            aria-label="Close form"
            role="button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        ) : null}

        {status === 'success' ? (
          <div className="message-container">
            {!showInstructions ? (
              <div className={`check-wrap ${fadeOutCheck ? 'fade-out' : ''}`}>
                <AnimatedCheckmark />
              </div>
            ) : (
             <>
  {/* Typewriter title */}
 <p id="message-title" className="message-title">
  <TypewriterCycle speed={45} startDelay={0}>Your next steps...</TypewriterCycle>
</p>

  {/* Staggered slide-ins (one-by-one from left) */}
  <ol className="instructions-list">
    <li className="message-body slide-in" style={{ "--delay": "1.2s" }}>
      Sign the{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://waiver.smartwaiver.com/w/dj188118umjqr7iwcr7jfq/web/"
      >
        waiver
      </a>
    </li>

    <li className="message-body slide-in" style={{ "--delay": "1.6s" }}>
      Check the class schedule
    </li>

    <li className="message-body slide-in" style={{ "--delay": "2.0s" }}>
      Attend any classes you want
    </li>

    <li className="message-body slide-in" style={{ "--delay": "2.4s" }}>
      For questions please see the FAQ section or call us directly
    </li>
  </ol>

  {/* Logo fades in after the list */}
  <img
    className="blue-logo fade-in-late"
    style={{ "--delay": "3.0s" }}
    src={bluelogo}
    alt="Logo"
  />
</>

            )}
          </div>
        ) : (
          <>
            <img className="first-blue-logo" src={bluelogo} alt="Logo" />
            <h2>Free Trial - 7 Days</h2>
            <br />

            {status === 'error' && (
              <p className="error-message center">{errorMsg}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid">
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

              <div className="captcha-container">
                <div className="captcha">
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
                disabled={!isValid || status === 'submitting'}
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
