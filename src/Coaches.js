import React, { useEffect, useRef, useState } from "react";
import "./Stylesheets/Coaches.css";
import CoachesList from "./Objects/CoachesObject";
import ImpactPlaque from "./Components/ImpactPlaque";
import coachplaque from "./Media/coachesplaque.png"

export default function Coaches({ className = "" }) {
  const items = Array.isArray(CoachesList) ? CoachesList : [];
  const [index, setIndex] = useState(1);

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  const go = (delta) => {
    setIndex((i) => {
      const next = i + delta;
      if (next < 0 || next > items.length - 1) return i;
      return next;
    });
  };

  // Keyboard support (Left/Right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && canPrev) go(-1);
      if (e.key === "ArrowRight" && canNext) go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canPrev, canNext]);

  // Touch swipe (mobile)
  const touchX = useRef(null);
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && canNext) go(1);
      if (dx > 0 && canPrev) go(-1);
    }
    touchX.current = null;
  };

  const posClass = (i) => {
    const d = i - index;
    if (d === 0) return "is-active";
    if (d === -1) return "is-prev";
    if (d === 1) return "is-next";
    if (d <= -2) return "is-left2";
    if (d >= 2) return "is-right2";
    return "is-far";
  };

  return (
    <section id='Coaches' className={`coaches-block ${className}`}>
    <h1>Coaches</h1>
        {/* Desktop: simple, uniform grid (no selection styles) */}
      <div className="coaches-desktop">
        <div className="coach-grid">
          {items.map((c, i) => (
            <article className="coach-card" key={(c.name || "coach") + i}>
              <div className="coach-media">
                <img src={c.image} alt={c.name || "Coach"} loading="lazy" decoding="async" />
              </div>
              <div className="coach-body">
                {c.name ? <h3 className="coach-name">{c.name}</h3> : null}
                {c.description ? <p className="coach-desc">{c.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile: 3D cover-flow */}
      <div
        className="coaches-mobile"
        role="region"
        aria-label="Coaches carousel"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {canPrev && (
          <button className="cf-arrow left" aria-label="Previous" onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M15.5 19 8.5 12l7-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {canNext && (
          <button className="cf-arrow right" aria-label="Next" onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M8.5 5 15.5 12l-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className="cf-stage">
          <div className="cf-stack">
            {items.map((c, i) => {
              const cls = posClass(i);
              const isCenter = cls === "is-active";
              return (
                <article
                  key={(c.name || "coach") + i}
                  className={`cf-slide ${cls}`}
                  onClick={() => !isCenter && setIndex(i)}
                >
                  <div className="cf-card">
                    <div className="cf-media">
                      <img src={c.image} alt={c.name || "Coach"} loading="lazy" decoding="async" />
                    </div>
                    <div className="cf-body">
                      {c.name ? <h3 className="cf-name">{c.name}</h3> : null}
                      {c.description ? <p className="cf-desc">{c.description}</p> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
