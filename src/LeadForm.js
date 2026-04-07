import React, { useState, useEffect } from 'react';
import './Stylesheets/LeadForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Turnstile } from '@marsidev/react-turnstile';
import { useAppContext } from "./AppContext";
import whitelogo from "./Media/whitelogonobg.webp";
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
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    setIsValid(
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      validateEmail(formData.email) &&
      cleanedPhone.length === 10 &&
      Boolean(captchaToken)
    );
  }, [formData, captchaToken]);

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
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
      <div className={`modal-card ${status === 'success' ? 'modal-card--success' : ''}`}>

        {/* close */}
        {closebutton && (
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
                  <TypewriterCycle speed={45} startDelay={0}>Your next steps...</TypewriterCycle>
                </p>
                <ol className="lf-steps-list">
                  <li className="lf-step slide-in" style={{ '--delay': '1.2s' }}>
                    Sign the{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://waiver.smartwaiver.com/w/dj188118umjqr7iwcr7jfq/web/">
                      waiver
                    </a>
                  </li>
                  <li className="lf-step slide-in" style={{ '--delay': '1.6s' }}>Check the class schedule</li>
                  <li className="lf-step slide-in" style={{ '--delay': '2.0s' }}>Attend any classes you want</li>
                </ol>
                <img className="lf-success-logo fade-in-late" style={{ '--delay': '3.0s' }} src={whitelogo} alt="Maple Jiu-Jitsu" />
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

            <form onSubmit={handleSubmit} className="lf-form">
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

              <Turnstile
                siteKey="0x4AAAAAACuXuYqwDOUxvxFB"
                onSuccess={(t) => { setCaptchaToken(t); setErrorMsg(''); }}
                onExpire={() => setCaptchaToken(null)}
                onError={() => { setCaptchaToken(null); setErrorMsg('Security check failed. Please refresh the page and try again.'); }}
                options={{ size: 'invisible' }}
              />

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
