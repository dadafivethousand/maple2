import { useState, useEffect, useRef } from 'react';

function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return m === 0 ? `${h12} ${ampm}` : `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}
import './Stylesheets/SummerCamp.css';
import Navbar from './Navbar';

const WORKER = 'https://worker-consolidated.maxli5004.workers.dev';

export default function SummerCamp() {
  const [campData, setCampData] = useState(null);
  // Map<weekId, 'full' | 'half'>
  const [selected, setSelected] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [gridVisible, setGridVisible] = useState(false);
  const pickerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setGridVisible(true); obs.disconnect(); }
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [campData]);

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
  const PRICE_FULL = campData.pricePerWeek / 100;
  const PRICE_HALF = campData.halfDayPrice / 100;
  const DISCOUNT = campData.bulkDiscount;
  const ALL_IDS = WEEKS.map(w => w.id);
  const allSelected = selected.size === WEEKS.length;

  const toggle = (id) => setSelected(prev => {
    const next = new Map(prev);
    if (next.has(id)) next.delete(id);
    else next.set(id, 'full');
    return next;
  });

  const setDayType = (id, type) => setSelected(prev => {
    const next = new Map(prev);
    next.set(id, type);
    return next;
  });

  const toggleAll = () => setSelected(allSelected
    ? new Map()
    : new Map(ALL_IDS.map(id => [id, 'full']))
  );

  const weekPrice = (week, dayType = 'full') => {
    if (dayType === 'half') {
      return allSelected ? PRICE_HALF * (1 - DISCOUNT) : PRICE_HALF;
    }
    const base = week.priceOverride != null ? week.priceOverride / 100 : PRICE_FULL;
    return allSelected ? base * (1 - DISCOUNT) : base;
  };

  const selectedEntries = WEEKS
    .filter(w => selected.has(w.id))
    .map(w => ({ week: w, dayType: selected.get(w.id) }));
  const total = selectedEntries.reduce((sum, { week, dayType }) => sum + weekPrice(week, dayType), 0);

  const handleCheckout = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch(`${WORKER}/summer-camp-purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weeks: Array.from(selected.entries()).map(([id, dayType]) => ({ id, dayType })),
        }),
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

            <div className="sc-meta-pills">
              <div className="sc-meta-pill"><span>🗓️</span><span>June 22 – Sep 4, 2026</span></div>
              <div className="sc-meta-pill"><span>📍</span><span>Maple, ON</span></div>
              <div className="sc-meta-pill"><span>⏰</span><span>{fmt12(campData.startTime)} – {fmt12(campData.endTime)}</span></div>
              <div className="sc-meta-pill"><span>👧</span><span>Ages 7 – 12</span></div>
            </div>

            <button className="sc-hero-cta" onClick={scrollToPicker}>
              Register Now
            </button>
          </div>
        </header>

        <section className="sc-section" ref={pickerRef}>
          <div className="sc-section-header">
            <h2 className="sc-section-title" data-sr>Pick Your Weeks</h2>
            <p className="sc-section-hint" data-sr data-sr-delay="80">Mix and match any weeks — choose full day or half day per week.</p>
          </div>

          {/* Pricing legend */}
          <div className="sc-pricing-legend" data-sr data-sr-delay="120">
            <div className="sc-legend-item">
              <span className="sc-legend-dot sc-legend-dot--full" />
              <span><strong>Full Day</strong> — 8:30 AM to 4:30 PM · $299.99 + HST</span>
            </div>
            <div className="sc-legend-item">
              <span className="sc-legend-dot sc-legend-dot--half" />
              <span><strong>Half Day</strong> — 8:30 AM to 12:30 PM · $179.99 + HST</span>
            </div>
          </div>

          <div className="sc-grid" ref={gridRef}>
            {/* Select All */}
            <button
              className={`sc-week-card sc-week-card--select-all ${allSelected ? 'sc-week-card--selected' : ''}${gridVisible ? ' sc-flip-in' : ''}`}
              style={gridVisible ? { animationDelay: '100ms' } : undefined}
              onClick={toggleAll}
              aria-pressed={allSelected}
            >
              <div className="sc-card-top">
                <span className={`sc-checkbox ${allSelected ? 'sc-checkbox--checked' : ''}`}>
                  {allSelected && (
                    <svg viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="sc-week-num">{WEEKS.length} weeks</span>
              </div>
              <p className="sc-week-dates">FULL SUMMER</p>
              <p className="sc-week-price">
                15% OFF
                <span className="sc-week-tax">+ HST</span>
              </p>
              <p className="sc-stat-note sc-stat-note--featured">Best value</p>
            </button>

            {WEEKS.map((week, i) => {
              const isSel = selected.has(week.id);
              const dayType = selected.get(week.id) || 'full';

              return (
                <button
                  key={week.id}
                  className={`sc-week-card ${isSel ? 'sc-week-card--selected' : ''} ${week.statHoliday ? 'sc-week-card--short' : ''}${gridVisible ? ' sc-flip-in' : ''}`}
                  style={gridVisible ? { animationDelay: `${120 + i * 50}ms` } : undefined}
                  onClick={() => toggle(week.id)}
                  aria-pressed={isSel}
                >
                  <div className="sc-card-top">
                    <span className={`sc-checkbox ${isSel ? 'sc-checkbox--checked' : ''}`}>
                      {isSel && (
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="sc-week-num">{week.label}</span>
                  </div>

                  <p className="sc-week-dates">{week.displayDates}</p>

                  {isSel && (
                    <div className="sc-day-toggle" onClick={e => e.stopPropagation()}>
                      <button
                        className={`sc-day-opt ${dayType === 'full' ? 'sc-day-opt--active' : ''}`}
                        onClick={() => setDayType(week.id, 'full')}
                      >
                        Full Day
                      </button>
                      <button
                        className={`sc-day-opt ${dayType === 'half' ? 'sc-day-opt--active' : ''}`}
                        onClick={() => setDayType(week.id, 'half')}
                      >
                        Half Day
                      </button>
                    </div>
                  )}

                  <p className="sc-week-price">
                    ${weekPrice(week, dayType).toFixed(2)}
                    <span className="sc-week-tax">+ HST</span>
                  </p>

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
            <p className="sc-eyebrow" data-sr>What to Expect</p>
            <h2 className="sc-section-title" data-sr data-sr-delay="80">Why Kids Love It</h2>
          </div>
          <div className="sc-info-grid">
            {[
              { icon: '🥋', color: '#7dd3fc', title: 'All Levels Welcome', body: 'No experience needed. Our coaches tailor every session — beginners thrive here from day one.' },
              { icon: '🏆', color: '#fbbf24', title: 'Structured Curriculum', body: 'Each week has its own theme, building skills progressively for well-rounded development.' },
              { icon: '👧', color: '#c084fc', title: 'Ages 7 – 12', body: 'Groups split by age and skill so every child is challenged at exactly the right pace.' },
              { icon: '🏅', color: '#4ade80', title: 'Expert Instructors', body: 'Certified, competition-tested coaches who genuinely love teaching kids in a safe, positive environment.' },
            ].map(({ icon, color, title, body }, i) => (
              <div className="sc-info-card" key={title} style={{ '--card-color': color }} data-sr data-sr-delay={`${i * 100}`}>
                <div className="sc-info-icon-wrap"><span className="sc-info-icon">{icon}</span></div>
                <h3 className="sc-info-title">{title}</h3>
                <p className="sc-info-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sc-faq">
          <div className="sc-section-header">
            <p className="sc-eyebrow" data-sr>Got Questions?</p>
            <h2 className="sc-section-title" data-sr data-sr-delay="80">Common Questions</h2>
          </div>
          <div className="sc-faq-grid">
            {[
              ['Do I need to register for consecutive weeks?', 'No — pick any combination. Mix and match as freely as you like.'],
              ['What is the difference between full day and half day?', 'Full day runs 8:30 AM to 4:30 PM. Half day runs 8:30 AM to 12:30 PM. You can choose per week.'],
              ['What should my child wear?', 'A gi (kimono) is required along with comfortable athletic clothing.'],
              ['What is the cancellation policy?', 'Full refund if cancelled 7+ days before the week starts. No refunds within 7 days.'],
              ['Where is camp held?', 'Maple Jiu-Jitsu Academy, 20 Cranston Park Ave, Maple, ON.'],
              ['What time is drop-off and pick-up?', 'Drop-off 8:30 am, pick-up 4:30 pm (full day) or 12:30 pm (half day) — Monday through Friday.'],
              ['Is lunch provided?', 'No — please pack a lunch and snacks for your child each day.'],
              ['How many kids per group?', 'Groups are kept small so every child gets individual attention from our instructors.'],
            ].map(([q, a], i) => (
              <div className="sc-faq-item" key={q} data-sr data-sr-delay={`${i * 60}`}>
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="sc-bottom-cta" data-sr>
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
