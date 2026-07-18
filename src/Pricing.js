// Pricing.js
import './Stylesheets/Pricing.css';
import './Stylesheets/SectionHeading.css';
import { useState, useEffect, useRef } from 'react';
import FALLBACK_PRICES from './Objects/FallbackPrices';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);

const formatSavings = (cents) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);

export default function Pricing() {
  // Start from a bundled snapshot so prices render instantly and never go
  // blank if the live API is blocked/unreachable; the fetch below overrides
  // it with fresh data when it succeeds.
  const [priceObject, setPriceObject] = useState(FALLBACK_PRICES);
  const [displayArray, setDisplayArray] = useState([]);

  // NEW: watch the whole Pricing section
  const containerRef = useRef(null);
  const [buttonsRevealed, setButtonsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setButtonsRevealed(true); // fire once
          obs.disconnect();
        }
      },
      { threshold: 0.5 } // ~50% of Pricing is visible
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = (index) => {
    setDisplayArray((prevArray) =>
      prevArray.includes(index)
        ? prevArray.filter((i) => i !== index)
        : [...prevArray, index]
    );
  };

  async function handleCheckout(higherIndex, index) {
    try {
      const response = await fetch(
        'https://worker-consolidated.maxli5004.workers.dev/purchase',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ higherIndex, index }),
          mode: 'cors',
        }
      );
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Failed to process checkout');
      }
    } catch (error) {
      console.error('Error with the checkout:', error);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function fetchMembershipInfo() {
      // Retry a few times before giving up; on total failure we keep the
      // bundled fallback prices already in state, so the section never blanks.
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await fetch(
            'https://worker-consolidated.maxli5004.workers.dev/membership-info'
          );
          if (response.ok) {
            const data = await response.json();
            if (!cancelled && Array.isArray(data) && data.length) {
              setPriceObject(data);
            }
            return;
          }
        } catch (error) {
          console.error('Error fetching Membership Info:', error);
        }
        await sleep(800 * (attempt + 1));
      }
      console.warn('membership-info unreachable; using bundled fallback prices');
    }

    fetchMembershipInfo();
    return () => { cancelled = true; };
  }, []);

  return (
    <div id="Memberships" className="PricingContainer" ref={containerRef}>
      <p className="section-heading" data-sr>
        <span className="sh-kicker">No Contracts · Cancel Anytime</span>
        <span className="sh-main">Memberships</span>
      </p>

      <div>
        {priceObject?.map((item, idx) => (
          <div key={idx} className="PricingButtonContainer">
            {/* Button slides in; alternates L/R with a stagger */}
            <button
              onClick={() => display(idx)}
              className={`is-visible AdultMembershipButton reveal-btn ${
                idx % 2 === 0 ? 'from-left' : 'from-right'
              } `}
              style={{ ['--btn-delay']: `${idx * 140}ms` }}
            >
              {item.label}
            </button>

            <div className="membership-flex">
              {item.info &&
                item.info.map((option, optionIndex) => {
                  const monthlyPrice = item.info[0].price;
                  const saveCents = !option.subscription
                    ? Math.round((monthlyPrice - Math.round(option.price / option.duration)) / 500) * 500
                    : 0;

                  return (
                    <div key={optionIndex} data-sr="flip-r" data-sr-delay={`${idx * 160 + optionIndex * 120}`}>
                      <div className="pricing-flex">
                        <div className="name-and-price">
                          <p className="name-of-class">{option.description}</p>
                        </div>

                        <div className="name-and-price">
                          <p className="price">
                            <span className="price-save" style={{ visibility: saveCents > 0 ? 'visible' : 'hidden' }}>
                              Save {formatSavings(saveCents)} per month
                            </span>
                            {formatCurrency(option.price)}
                            <span className="hst">+ HST</span>
                          </p>
                        </div>

                        {Array.isArray(option.features) &&
                          option.features.length > 0 && (
                            <ul className="features" aria-label="What you get">
                              {option.features.map((f, i) => (
                                <li key={i} className="feature-item">
                                  <span>✅ </span>
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                        <button
                          onClick={() => handleCheckout(idx, optionIndex)}
                          id="purchase-button"
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
