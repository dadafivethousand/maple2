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
        {/* Circle outline */}
        <circle
          className="ck-circle"
          cx="26"
          cy="26"
          r="23"
          fill="none"
          pathLength="100"
        />
        {/* Checkmark */}
        <polyline
          className="ck-check"
          points="14,27 22,35 38,19"
          fill="none"
          pathLength="100"
        />
      </svg>
    </div>
  );
}
