import { useState, useEffect, useRef } from 'react';
import './Stylesheets/SummerCamp.css';
import Navbar from './Navbar';
import campHeroImg from './Media/IMG_0640.jpg';

const WORKER = 'https://worker-consolidated.maxli5004.workers.dev';

export default function SummerCamp() {
  const [campData, setCampData] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    fetch(`${WORKER}/summer-camp`)
      .then(r => r.json())
      .then(setCampData)
      .catch(console.error);
  }, []);

  if (!campData) {
    return (
      <div className="sc-page">
        <div className="sc-loading">
          <span className="sc-loading-dot" />
          <span className="sc-loading-dot" />
          <span className="sc-loading-dot" />
        </div>
      </div>
    );
  }

  const WEEKS = campData.weeks.filter(w => w.active);
  const PRICE_PER_WEEK = campData.pricePerWeek / 100;
  const DISCOUNT = campData.bulkDiscount;
  const ALL_IDS = new Set(WEEKS.map(w => w.id));
  const allSelected = selected.size === WEEKS.length;

  const toggle = (id) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(ALL_IDS));

  const weekPrice = (week) => {
    const base = week.priceOverride != null ? week.priceOverride / 100 : PRICE_PER_WEEK;
    return allSelected ? base * (1 - DISCOUNT) : base;
  };

  const selectedWeeks = WEEKS.filter(w => selected.has(w.id));
  const total = selectedWeeks.reduce((sum, w) => sum + weekPrice(w), 0);

  const handleCheckout = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch(`${WORKER}/summer-camp-purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekIds: Array.from(selected) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err.message);
      setLoading(false);
    }
  };

  const scrollToPicker = () =>
    pickerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <Navbar />
      <div className="sc-page">
        <header className="sc-hero">
          <div className="sc-hero-glow" aria-hidden="true" />
          <div className="sc-hero-glow-2" aria-hidden="true" />

          <div className="sc-hero-content">
            <p className="sc-hero-kicker">Maple Jiu-Jitsu &nbsp;·&nbsp; Summer 2026</p>

            <div className="sc-hero-title-wrap">
              <h1 className="sc-hero-title">
                <span className="sc-title-summer">Summer</span>
                <span className="sc-title-camp">Camp</span>
              </h1>
            </div>

            <p className="sc-hero-sub">
              An immersive martial arts experience for kids ages&nbsp;7–12.
              <br />
              All skill levels welcome — no experience necessary.
            </p>

            <button className="sc-hero-cta" onClick={scrollToPicker}>
              Register Now
       
            </button>
          </div>

          <div className="sc-scroll-hint" aria-hidden="true">
            <span />
          </div>
        </header>

        <div className="sc-photo-banner" style={{ backgroundImage: `url(${campHeroImg})` }}>
          <div className="sc-photo-banner-inner">
            <p className="sc-banner-quote">A summer they'll never forget</p>
            <div className="sc-meta-row">
              <div className="sc-meta-pill"><span>🗓️</span><span>June 22 – September 4, 2026</span></div>
              <div className="sc-meta-pill"><span>📍</span><span>20 Cranston Park Ave, Maple, ON</span></div>
              <div className="sc-meta-pill"><span>⏰</span><span>Monday – Friday &nbsp;·&nbsp; 8:30 am – 4:30 pm</span></div>
              <div className="sc-meta-pill"><span>👧</span><span>Ages 7 – 12</span></div>
            </div>
          </div>
        </div>

        <section className="sc-section" ref={pickerRef}>
          <div className="sc-section-header">
          
            <h2 className="sc-section-title">Pick Your Weeks</h2>
            <p className="sc-section-hint">Mix and match any weeks — no consecutive booking required.</p>
          </div>

          <div className="sc-grid">
            <button
              className={`sc-week-card sc-week-card--select-all ${allSelected ? 'sc-week-card--selected' : ''}`}
              onClick={toggleAll}
              aria-pressed={allSelected}
            >
              <div className="sc-card-top">
                <span className={`sc-checkbox ${allSelected ? 'sc-checkbox--checked' : ''}`}>
                  {allSelected && (
                    <svg viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="sc-week-num">11 weeks</span>
              </div>

              <p className="sc-week-dates">FULL SUMMER</p>
              <p className="sc-week-price">15% OFF</p>
              <p className="sc-stat-note sc-stat-note--featured">Best value</p>
            </button>

            {WEEKS.map((week) => {
              const isSel = selected.has(week.id);

              return (
                <button
                  key={week.id}
                  className={`sc-week-card ${isSel ? 'sc-week-card--selected' : ''} ${week.statHoliday ? 'sc-week-card--short' : ''}`}
                  onClick={() => toggle(week.id)}
                  aria-pressed={isSel}
                >
                  <div className="sc-card-top">
                    <span className={`sc-checkbox ${isSel ? 'sc-checkbox--checked' : ''}`}>
                      {isSel && (
                        <svg viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="sc-week-num">{week.label}</span>
                  </div>

                  <p className="sc-week-dates">{week.displayDates}</p>
                  <p className="sc-week-price">${weekPrice(week).toFixed(2)}</p>

                  {week.statHoliday ? (
                    <p className="sc-stat-note">⚡ Short week</p>
                  ) : (
                    <p className="sc-stat-note sc-stat-note--empty" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="sc-info-strip">
          <div className="sc-section-header">
            <p className="sc-eyebrow">What to Expect</p>
            <h2 className="sc-section-title">Why Kids Love It</h2>
          </div>
          <div className="sc-info-grid">
            {[
              { icon: '🥋', color: '#7dd3fc', title: 'All Levels Welcome', body: 'No experience needed. Our coaches tailor every session — beginners thrive here from day one.' },
              { icon: '🏆', color: '#fbbf24', title: 'Structured Curriculum', body: 'Each week has its own theme, building skills progressively for well-rounded development.' },
              { icon: '👧', color: '#c084fc', title: 'Ages 7 – 12', body: 'Groups split by age and skill so every child is challenged at exactly the right pace.' },
              { icon: '🏅', color: '#4ade80', title: 'Expert Instructors', body: 'Certified, competition-tested coaches who genuinely love teaching kids in a safe, positive environment.' },
            ].map(({ icon, color, title, body }) => (
              <div className="sc-info-card" key={title} style={{ '--card-color': color }}>
                <div className="sc-info-icon-wrap"><span className="sc-info-icon">{icon}</span></div>
                <h3 className="sc-info-title">{title}</h3>
                <p className="sc-info-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sc-faq">
          <div className="sc-section-header">
            <p className="sc-eyebrow">Got Questions?</p>
            <h2 className="sc-section-title">Common Questions</h2>
          </div>
          <div className="sc-faq-grid">
            {[
              ['Do I need to register for consecutive weeks?', 'No — pick any combination. Mix and match as freely as you like.'],
              ['What should my child wear?', 'A gi (kimono) is required along with comfortable athletic clothing.'],
              ['What is the cancellation policy?', 'Full refund if cancelled 7+ days before the week starts. No refunds within 7 days.'],
              ['Where is camp held?', 'Maple Jiu-Jitsu Academy, 20 Cranston Park Ave, Maple, ON.'],
              ['What time is drop-off and pick-up?', 'Drop-off 8:30 am, pick-up 4:30 pm — Monday through Friday.'],
              ['Is lunch provided?', 'No — please pack a lunch and snacks for your child each day.'],
              ['My child has never done BJJ — is that okay?', 'Absolutely. Camp is designed for beginners. Coaches meet every child at their level.'],
              ['How many kids per group?', 'Groups are kept small so every child gets individual attention from our instructors.'],
            ].map(([q, a]) => (
              <div className="sc-faq-item" key={q}>
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="sc-bottom-cta">
          <div className="sc-bottom-cta-inner">
            <p className="sc-bottom-cta-label">Still have questions?</p>
            <p className="sc-bottom-cta-headline">Give us a call.</p>
            <a href="tel:+16478879940" className="sc-phone-link">(647) 887-9940</a>
          </div>
        </div>
      </div>

      <div className={`sc-cart-bar ${selected.size > 0 ? 'sc-cart-bar--visible' : ''}`}>
        <div className="sc-cart-bar-info">
          <span className="sc-cart-bar-count">{selected.size} {selected.size === 1 ? 'week' : 'weeks'}</span>
          <span className="sc-cart-bar-sep">·</span>
          <span className="sc-cart-bar-total">${total.toFixed(2)}</span>
          <span className="sc-cart-bar-tax">+ HST</span>
        </div>
        <button className="sc-cart-bar-btn" disabled={loading} onClick={handleCheckout}>
          {loading ? 'Redirecting…' : 'Register Now →'}
        </button>
      </div>
    </>
  );
}