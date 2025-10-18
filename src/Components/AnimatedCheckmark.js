import React from "react";
import "../Stylesheets/AnimatedCheckmark.css";

/**
 * Usage:
 *  const [submitted, setSubmitted] = useState(false);
 *  {submitted && <AnimatedCheckmark size={96} />}
 */
export default function AnimatedCheckmark({ size = 96, className = "", title = "Success" }) {
  return (
    <div
      className={`ck ${className}`}
      style={{ "--ck-size": `${size}px` }}
      role="status"
      aria-label={title}
    >
      <svg className="ck-svg" viewBox="0 0 52 52" aria-hidden="true">
        {/* A: DRAW LAYER (no dots) */}
        <circle className="ck-circle-draw" cx="26" cy="26" r="23" fill="none" pathLength="100" />
        <polyline className="ck-check-draw" points="14,27 22,35 38,19" fill="none" pathLength="100" />

        {/* B: FINAL LAYER (pretty round caps, fades in after draw) */}
        <circle className="ck-circle-final" cx="26" cy="26" r="23" fill="none" pathLength="100" />
        <polyline className="ck-check-final" points="14,27 22,35 38,19" fill="none" pathLength="100" />
      </svg>
    </div>
  );
}
