import { useState } from 'react';
import './Stylesheets/SummerCamp.css';
import Navbar from './Navbar';

const WEEKS = [
  { id: 1,  dates: 'June 22 – 26'      },
  { id: 2,  dates: 'June 30 – July 4'  },
  { id: 3,  dates: 'July 7 – 11'       },
  { id: 4,  dates: 'July 14 – 18'      },
  { id: 5,  dates: 'July 21 – 25'      },
  { id: 6,  dates: 'July 28 – Aug 1'   },
  { id: 7,  dates: 'Aug 4 – 8'         },
  { id: 8,  dates: 'Aug 11 – 15'       },
  { id: 9,  dates: 'Aug 18 – 22'       },
  { id: 10, dates: 'Aug 25 – 29'       },
  { id: 11, dates: 'Aug 31 – Sep 4'    },
];

const PRICE_PER_WEEK = 300;

export default function SummerCamp() {
  const [selected, setSelected] = useState(new Set());

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = selected.size * PRICE_PER_WEEK;

  const selectedWeeks = WEEKS.filter((w) => selected.has(w.id));

  return (
    <>
      <Navbar />
      <div className="sc-page">

        {/* ── Hero ── */}
        <header className="sc-hero">
          <p className="sc-eyebrow">Maple Jiu-Jitsu Academy · Summer 2026</p>
          <h1 id="sc-title">Summer Camp</h1>
          <p className="sc-subtitle">
            A week-by-week BJJ experience for kids &amp; teens &mdash; all skill levels welcome.
          </p>
          <div className="sc-meta-row">
            <div className="sc-meta-pill">
              <span className="sc-meta-icon">📅</span>
              <span>June 22 – Sep 4</span>
            </div>
            <div className="sc-meta-pill">
              <span className="sc-meta-icon">⏰</span>
              <span>Mon – Fri · 9am – 3pm</span>
            </div>
            <div className="sc-meta-pill">
              <span className="sc-meta-icon">💰</span>
              <span>$300 / week</span>
            </div>
          </div>
        </header>

        {/* ── Week picker ── */}
        <section className="sc-section">
          <p className="sc-section-label">Select Your Weeks</p>
          <p className="sc-section-hint">Choose one or more — mix and match as you like.</p>

          <div className="sc-grid">
            {WEEKS.map((week) => {
              const isSelected = selected.has(week.id);
              return (
                <button
                  key={week.id}
                  className={`sc-week-card ${isSelected ? 'sc-week-card--selected' : ''}`}
                  onClick={() => toggle(week.id)}
                  aria-pressed={isSelected}
                >
                  <div className="sc-week-top">
                    <p className="sc-week-dates">{week.dates}</p>
                    <span className={`sc-check ${isSelected ? 'sc-check--visible' : ''}`}>
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  <p className="sc-week-price">$300</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Order summary ── */}
        <section className={`sc-summary ${selected.size > 0 ? 'sc-summary--visible' : ''}`}>
          <div className="sc-summary-inner">

            <div className="sc-summary-left">
              <p className="sc-summary-title">Your Registration</p>
              {selected.size === 0 ? (
                <p className="sc-summary-empty">No weeks selected yet.</p>
              ) : (
                <ul className="sc-summary-list">
                  {selectedWeeks.map((w) => (
                    <li key={w.id} className="sc-summary-item">
                      <span className="sc-summary-item-label">{w.label} &mdash; {w.dates}</span>
                      <span className="sc-summary-item-price">$300</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="sc-summary-right">
              <div className="sc-total-block">
                <p className="sc-total-label">
                  {selected.size} {selected.size === 1 ? 'week' : 'weeks'} selected
                </p>
                <p className="sc-total-amount">${total.toLocaleString()}</p>
                <p className="sc-total-tax">+ HST</p>
              </div>

              <button
                className={`sc-cta-btn ${selected.size > 0 ? 'sc-cta-btn--active' : ''}`}
                disabled={selected.size === 0}
              >
                Register Now →
              </button>

              {selected.size > 1 && (
                <p className="sc-multi-note">
                  Registering for {selected.size} weeks at $300 each.
                </p>
              )}
            </div>

          </div>
        </section>

        {/* ── Info strip ── */}
        <section className="sc-info-strip">
          <div className="sc-info-grid">
            <div className="sc-info-card">
              <span className="sc-info-icon">🥋</span>
              <h3>All Levels Welcome</h3>
              <p>No prior experience needed. Our coaches tailor each session to the group.</p>
            </div>
            <div className="sc-info-card">
              <span className="sc-info-icon">🏆</span>
              <h3>Structured Curriculum</h3>
              <p>Each week has its own theme, building on the last for well-rounded development.</p>
            </div>
            <div className="sc-info-card">
              <span className="sc-info-icon">👧</span>
              <h3>Ages 7 – 12</h3>
              <p>Groups are divided by age and skill level so every child thrives.</p>
            </div>
            <div className="sc-info-card">
              <span className="sc-info-icon">🍱</span>
              <h3>Lunch &amp; Snacks Included</h3>
              <p>Healthy meals provided. Just bring a water bottle and a gi (loaner gis available).</p>
            </div>
          </div>
        </section>

        {/* ── FAQ strip ── */}
        <section className="sc-faq">
          <p className="sc-section-label">Common Questions</p>
          <div className="sc-faq-grid">
            <div className="sc-faq-item">
              <h4>Do I need to register for consecutive weeks?</h4>
              <p>No — you can pick any combination of weeks that works for your schedule.</p>
            </div>
            <div className="sc-faq-item">
              <h4>What should my child wear?</h4>
              <p>A gi (kimono) is preferred. If you don't have one, loaner gis are available at no extra charge.</p>
            </div>
            <div className="sc-faq-item">
              <h4>Is there a sibling discount?</h4>
              <p>Yes — 10% off each additional sibling. Contact us after registering to apply the discount.</p>
            </div>
            <div className="sc-faq-item">
              <h4>What is the cancellation policy?</h4>
              <p>Full refund if cancelled 7+ days before the week starts. No refunds within 7 days.</p>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <div className="sc-bottom-cta">
          <p>Questions? Give us a call.</p>
          <a href="tel:+16478879940" className="sc-phone-link">(647) 887-9940</a>
        </div>

      </div>
    </>
  );
}
