import '../Stylesheets/AwardWidget2.css'
import chamberLogo from '../Media/VaughanChamberofCommerce.svg'

export default function AwardWidget2() {
  return (
    <div className="aw2-wrap" role="img" aria-label="Vaughan Chamber of Commerce — New Business of the Year Finalist 2025">
      <div className="aw2-badge">

        <span className="aw2-corner aw2-corner--tl" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--tr" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--bl" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--br" aria-hidden="true">◆</span>

        <div className="aw2-row">

          {/* Left: big logo, no circle */}
          <div className="aw2-logo-panel">
            <img className="aw2-logo" src={chamberLogo} alt="Vaughan Chamber of Commerce" />
          </div>

          {/* Vertical divider */}
          <div className="aw2-vdivider" aria-hidden="true" />

          {/* Right: all text */}
          <div className="aw2-copy">
            <p className="aw2-program">Business Excellence<br />Achievement Award</p>
            <div className="aw2-rule" aria-hidden="true"><span className="aw2-rule-gem">◆</span></div>
            <h3 className="aw2-title">New Business<br />of the Year</h3>
            <div className="aw2-rule" aria-hidden="true"><span className="aw2-rule-gem">◆</span></div>
            <div className="aw2-meta-row">
              <span className="aw2-finalist">Finalist</span>
              <span className="aw2-dot">·</span>
              <span className="aw2-recipient">Maple Jiu-Jitsu</span>
              <span className="aw2-dot">·</span>
              <span className="aw2-year">2025</span>
            </div>
          </div>

        </div>

        <div className="aw2-ribbon">
          <span className="aw2-ribbon-text">Officially Recognized · Vaughan, Ontario</span>
        </div>

      </div>
    </div>
  )
}
