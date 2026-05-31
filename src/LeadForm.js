import React, { useState, useEffect } from 'react';
import './Stylesheets/LeadForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import { useAppContext } from "./AppContext";
import whitelogo from "./Media/whitelogonobg.webp";
import smartwaiverLogo from "./Media/smartwaiver_logo.webp";
import AnimatedCheckmark from './Components/AnimatedCheckmark';
import TypewriterCycle from './Utils/Typewriter';
import Badge from './Components/Badge';
import InlineLeadForm from './Components/InlineLeadForm';

export default function LeadForm({ closebutton, inline = false }) {
  const { setShowForm } = useAppContext();

  const [captchaToken, setCaptchaToken] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [showInstructions, setShowInstructions] = useState(false);
  const [fadeOutCheck, setFadeOutCheck] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userStarted, setUserStarted] = useState(false);
  const [waiverClicked, setWaiverClicked] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const cleanedPhone = formData.phone.replace(/\D/g, '');
  const isValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    validateEmail(formData.email) &&
    cleanedPhone.length === 10 &&
    Boolean(captchaToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 3 && cleaned.length <= 6) formatted = `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`;
      else if (cleaned.length > 6) formatted = `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
      setFormData(p => ({ ...p, phone: formatted }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  useEffect(() => {
    if (status !== 'success') return;
    setShowInstructions(false);
    setFadeOutCheck(false);
    const t1 = setTimeout(() => setFadeOutCheck(true), 1200);
    const t2 = setTimeout(() => setShowInstructions(true), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('https://worker-consolidated.maxli5004.workers.dev/intake-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ ...formData, phone: formData.phone.replace(/\D/g, ''), turnstileToken: captchaToken }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err?.message || 'Unexpected error');
        setStatus('error');
        return;
      }
      setStatus('success');
      window.gtag?.('event', 'generate_lead', { event_category: 'form', event_label: 'intake_form' });
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch {
      setErrorMsg('Error submitting the form');
      setStatus('error');
    }
  };

  if (inline) return <InlineLeadForm />;

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target !== e.currentTarget) return; if (status !== 'success' || waiverClicked) setShowForm(false); }}>
      <div className={`modal-card ${status === 'success' ? 'modal-card--success' : ''}`}>

        {/* close — hidden on success screen until waiver tapped */}
        {closebutton && (status !== 'success' || waiverClicked) && (
          <button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {status === 'success' ? (
          <div className="lf-success-wrap">
            {!showInstructions ? (
              <div className={`check-wrap ${fadeOutCheck ? 'fade-out' : ''}`}>
                <AnimatedCheckmark />
              </div>
            ) : (
              <>
                <p className="lf-success-title">
                  <TypewriterCycle speed={45} startDelay={0}>One step left —</TypewriterCycle>
                </p>
                <p className="lf-success-sub slide-in" style={{ '--delay': '0.9s' }}>
                  Sign the waiver and then show up to any class!
                </p>
                <a
                  className="lf-waiver-btn slide-in"
                  style={{ '--delay': '1.5s' }}
                  href="https://waiver.smartwaiver.com/w/dj188118umjqr7iwcr7jfq/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaiverClicked(true)}
                >
                  <img className="lf-waiver-logo" src={smartwaiverLogo} alt="Smartwaiver" />
                  <span className="lf-waiver-text">
                    <span className="lf-waiver-cta">Sign the Waiver</span>
                    <span className="lf-waiver-sub">Tap to complete — takes 1 minute</span>
                  </span>
                  <span className="lf-waiver-arrow">→</span>
                </a>
                <img className="lf-success-logo fade-in-late" style={{ '--delay': '3.2s' }} src={whitelogo} alt="Maple Jiu-Jitsu" />
              </>
            )}
          </div>
        ) : (
          <>
            <div className="lf-top">
              <Badge>7-Day Free Trial</Badge>
              <p className="lf-sub">No commitment &nbsp;·&nbsp; All levels &nbsp;·&nbsp; Adults &amp; Kids</p>
            </div>

            {status === 'error' && <p className="lf-error">{errorMsg}</p>}

            <form onSubmit={handleSubmit} className="lf-form" onFocus={() => setUserStarted(true)}>
              <div className="lf-row">
                <div className="lf-field">
                  <input className="lf-input" id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder=" " required autoComplete="given-name" />
                  <label className="lf-label" htmlFor="firstName">First Name</label>
                </div>
                <div className="lf-field">
                  <input className="lf-input" id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder=" " required autoComplete="family-name" />
                  <label className="lf-label" htmlFor="lastName">Last Name</label>
                </div>
              </div>
              <div className="lf-row">
                <div className="lf-field">
                  <input className="lf-input" id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required autoComplete="email" />
                  <label className="lf-label" htmlFor="email">Email</label>
                </div>
                <div className="lf-field">
                  <input className="lf-input" id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder=" " required autoComplete="tel" />
                  <label className="lf-label" htmlFor="phone">Phone</label>
                </div>
              </div>

              {userStarted && (
                <Turnstile
                  siteKey="0x4AAAAAACuXuYqwDOUxvxFB"
                  onSuccess={(t) => { setCaptchaToken(t); setErrorMsg(''); }}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => { setCaptchaToken(null); setErrorMsg('Security check failed. Please refresh the page and try again.'); }}
                  options={{ size: 'invisible', retry: 'auto', retryInterval: 3000, refreshExpired: 'auto' }}
                />
              )}

              <button
                type="submit"
                className={`lf-btn ${isValid ? 'lf-btn--active' : 'lf-btn--disabled'}`}
                disabled={!isValid || status === 'submitting'}
              >
                {status === 'submitting' ? 'Submitting…' : 'CLAIM YOUR FREE TRIAL →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
