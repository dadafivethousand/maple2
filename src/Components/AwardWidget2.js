import '../Stylesheets/AwardWidget2.css'
import chamberLogo from '../Media/VaughanChamberofCommerce.svg'

export default function AwardWidget2() {
  return (
    <div className="aw2-wrap" role="img" aria-label="Vaughan Chamber of Commerce — New Business of the Year Finalist 2025">
      <div className="aw2-badge">

        {/* Corner ornaments */}
        <span className="aw2-corner aw2-corner--tl" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--tr" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--bl" aria-hidden="true">◆</span>
        <span className="aw2-corner aw2-corner--br" aria-hidden="true">◆</span>

        {/* Logo section */}
        <div className="aw2-top">
          <div className="aw2-logo-halo">
            <img className="aw2-logo" src={chamberLogo} alt="Vaughan Chamber of Commerce" />
          </div>
          <p className="aw2-org">Vaughan Chamber of Commerce</p>
        </div>

        {/* Ornamental divider */}
        <div className="aw2-rule" aria-hidden="true">
          <span className="aw2-rule-gem">◆</span>
        </div>

        {/* Award body */}
        <div className="aw2-body">
          <p className="aw2-program">Business Excellence Achievement Award</p>
          <div className="aw2-laurel-row" aria-hidden="true">
            <span className="aw2-laurel aw2-laurel--l">❧</span>
            <span className="aw2-laurel-stars">✦ ✦ ✦</span>
            <span className="aw2-laurel aw2-laurel--r">❧</span>
          </div>
          <h3 className="aw2-title">New Business<br />of the Year</h3>
          <div className="aw2-rule" aria-hidden="true">
            <span className="aw2-rule-gem">◆</span>
          </div>
          <p className="aw2-recipient">Maple Jiu-Jitsu</p>
          <div className="aw2-finalist-wrap">
            <span className="aw2-finalist">Finalist</span>
            <span className="aw2-year">2025</span>
          </div>
        </div>

        {/* Ribbon */}
        <div className="aw2-ribbon">
          <span className="aw2-ribbon-text">Officially Recognized · Vaughan, Ontario</span>
        </div>

      </div>
    </div>
  )
}
