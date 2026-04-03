import { useState, useEffect } from 'react';
import './Stylesheets/SummerCamp.css';
import Navbar from './Navbar';
import campHeroImg from './Media/IMG_0640.jpg';

const WORKER = 'https://worker-consolidated.maxli5004.workers.dev';

export default function SummerCamp() {
  const [campData, setCampData] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    fetch(`${WORKER}/summer-camp`)
      .then(r => r.json())
      .then(setCampData)
      .catch(console.error);
  }, []);

  if (!campData) return <div className="sc-page"><div className="sc-loading">Loading...</div></div>;

  const WEEKS = campData.weeks.filter(w => w.active);
  const PRICE_PER_WEEK = campData.pricePerWeek / 100;
  const DISCOUNT = campData.bulkDiscount;
  const ALL_IDS = new Set(WEEKS.map(w => w.id));

  const allSelected = selected.size === WEEKS.length;

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(ALL_IDS));
  };

  const discounted = allSelected;

  const weekPrice = (week) => {
    const base = week.priceOverride != null ? week.priceOverride / 100 : PRICE_PER_WEEK;
    return discounted ? base * (1 - DISCOUNT) : base;
  };

  const selectedWeeks = WEEKS.filter((w) => selected.has(w.id));

  const total = selectedWeeks.reduce((sum, w) => sum + weekPrice(w), 0);

  const allWeeksSavings = WEEKS.reduce((sum, w) => {
    const base = w.priceOverride != null ? w.priceOverride / 100 : PRICE_PER_WEEK;
    return sum + base * DISCOUNT;
  }, 0);

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

  return (
    <>
      <Navbar />
      <div className="sc-page">

        {/* ── Hero ── */}
        <header className="sc-hero">
          <img src={campHeroImg} className="sc-hero-img" alt="" aria-hidden="true" />
          <div className="sc-hero-content">
            <p className="sc-eyebrow">Maple Jiu-Jitsu Academy · Summer 2026</p>
            <h1 id="sc-title">A summer they'll<br />never forget.</h1>
            <div className="sc-meta-row">
              <div className="sc-meta-pill">
                <span className="sc-meta-icon">⏰</span>
                <span>Mon – Fri · 8:30am – 4:30pm</span>
              </div>
              <div className="sc-meta-pill">
                <span className="sc-meta-icon">📍</span>
                <span>Maple, ON</span>
              </div>
              <div className="sc-meta-pill">
                <span className="sc-meta-icon">🗓️</span>
                <span>Jun 22 – Sep 4, 2026</span>
              </div>
            </div>
          </div>
          <div className="sc-scroll-hint" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </header>

        {/* ── Week picker ── */}
        <section className="sc-section">
          <p className="sc-section-label">Select Your Weeks</p>
          <p className="sc-section-hint">Choose one or more — mix and match as you like.</p>

          {/* Select All row */}
          <button className={`sc-select-all ${allSelected ? 'sc-select-all--active' : ''}`} onClick={toggleAll}>
            <span className={`sc-checkbox sc-select-all-check ${allSelected ? 'sc-checkbox--checked' : ''}`}>
              {allSelected && (
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="sc-select-all-eyebrow">★ Best Value of the Season</span>
            <span className="sc-select-all-text">Full Summer — All {WEEKS.length} Weeks</span>
            <span className="sc-select-all-savings-row">
              <span className="sc-discount-badge">15% OFF</span>
   
            </span>
            <span className="sc-select-all-sub">Jun 22 – Sept 4, 2026 &nbsp;·&nbsp; Mon – Fri</span>
          </button>

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
                    <span className={`sc-checkbox ${isSelected ? 'sc-checkbox--checked' : ''}`}>
                      {isSelected && (
                        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <p className="sc-week-dates">{week.displayDates}</p>
                  </div>
                  <p className="sc-week-price">${weekPrice(week).toFixed(2)}</p>
                  <p className="sc-week-stat-note">{week.statHoliday ? <><strong>Short week</strong> —<br />{week.statHoliday}</> : ''}</p>
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
                      <span className="sc-summary-item-label">{w.label} · {w.displayDates}</span>
                      <span className="sc-summary-item-price">${weekPrice(w).toFixed(2)}</span>
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
                <p className="sc-total-amount">${total.toFixed(2)}</p>
                {discounted && <p className="sc-discount-applied">15% discount applied</p>}
                <p className="sc-total-tax">+ HST</p>
              </div>

              <button
                className={`sc-cta-btn ${selected.size > 0 ? 'sc-cta-btn--active' : ''}`}
                disabled={selected.size === 0 || loading}
                onClick={handleCheckout}
              >
                {loading ? 'Redirecting…' : 'Register Now →'}
              </button>
              {checkoutError && <p className="sc-checkout-error">{checkoutError}</p>}

            </div>

          </div>
        </section>

        {/* ── Parallax photo strip ── */}
        <div className="sc-photo-banner" style={{ backgroundImage: `url(${campHeroImg})` }} />

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
              <span className="sc-info-icon">🏅</span>
              <h3>Experienced Instructors</h3>
              <p>Our coaches are certified, competition-tested, and passionate about teaching kids in a safe environment.</p>
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
              <p>A gi (kimono) is required along with regular clothing.</p>
            </div>
            <div className="sc-faq-item">
              <h4>What is the cancellation policy?</h4>
              <p>Full refund if cancelled 7+ days before the week starts. No refunds within 7 days.</p>
            </div>
            <div className="sc-faq-item">
              <h4>Where is the camp held?</h4>
              <p>Camp takes place at Maple Jiu-Jitsu Academy, located at 20 Cranston Park Ave, Maple, ON.</p>
            </div>
            <div className="sc-faq-item">
              <h4>What time does drop-off and pick-up happen?</h4>
              <p>Drop-off is at 8:30am and pick-up is at 4:30pm, Monday through Friday.</p>
            </div>
            <div className="sc-faq-item">
              <h4>Is lunch provided?</h4>
              <p>Lunch is not provided — please pack a lunch and snacks for your child each day.</p>
            </div>
            <div className="sc-faq-item">
              <h4>My child has never done BJJ before — is that okay?</h4>
              <p>Absolutely. Camp is designed to welcome complete beginners. Our coaches will meet your child at their level.</p>
            </div>
            <div className="sc-faq-item">
              <h4>How many kids are in each group?</h4>
              <p>Groups are kept small to ensure each child gets individual attention from our instructors.</p>
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
