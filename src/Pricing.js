// Pricing.js
import './Stylesheets/Pricing.css';
import './Stylesheets/SectionHeading.css';
import { useState, useEffect, useRef } from 'react';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);

export default function Pricing() {
  const [priceObject, setPriceObject] = useState(null);
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
    async function fetchMembershipInfo() {
      try {
        const response = await fetch(
          'https://worker-consolidated.maxli5004.workers.dev/membership-info'
        );
        if (response.ok) {
          const data = await response.json();
          setPriceObject(data);
        } else {
          console.error('Failed to fetch membership info');
        }
      } catch (error) {
        console.error('Error fetching Membership Info:', error);
      }
    }
    fetchMembershipInfo();
  }, []);

  return (
    <div id="Memberships" className="PricingContainer" ref={containerRef}>
      <p className="section-heading">
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
                    <div key={optionIndex}>
                      <div className="pricing-flex">
                        <div className="name-and-price">
                          <p className="name-of-class">{option.description}</p>
                        </div>

                        <div className="name-and-price">
                          <p className="price">
                            {saveCents > 0 && (
                              <span className="price-save">Save {formatCurrency(saveCents)} per month</span>
                            )}
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
