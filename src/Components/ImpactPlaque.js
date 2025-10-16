import React from "react";
import "../Stylesheets/ImpactPlaque.css";

export default function ImpactPlaque({
  slogan = "COACHES",
  subtitle = "QUALITY • SAFETY • PRIDE",
  serial = "PLQ-9021",
}) {
  return (
    <figure className="ipx" aria-label={`${slogan} — engraved metal plaque`}>
      {/* Plate */}
      <div className="ipx-plate">
        {/* Corner bolts */}
        <div className="ipx-bolt ipx-bolt--tl" />
        <div className="ipx-bolt ipx-bolt--tr" />
        <div className="ipx-bolt ipx-bolt--bl" />
        <div className="ipx-bolt ipx-bolt--br" />

        {/* Engraved headline */}
        <h2 className="ipx-engrave" data-text={slogan}>{slogan}</h2>

        {/* Optional engraved subline */}
        {subtitle && (
          <div className="ipx-sub" data-text={subtitle}>{subtitle}</div>
        )}

        {/* Tiny stamped serial */}
        <div className="ipx-serial" data-text={serial} aria-hidden="true">
          {serial}
        </div>
      </div>

      <figcaption className="ipx-sr">{slogan}</figcaption>
    </figure>
  );
}
