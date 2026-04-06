import '../Stylesheets/AwardWidget.css'
import vaughanLogo from '../Media/VaughanChamberofCommerce.svg'

export default function AwardWidget() {
  return (
    <div className="award-widget" aria-label="New Business of the Year finalist badge from the Vaughan Chamber of Commerce">
      <div className="award-widget__badge">
        <div className="award-widget__seal">
          <img className="award-widget__logo" src={vaughanLogo} alt="Vaughan Chamber of Commerce logo" />
        </div>

        <div className="award-widget__copy">
          <span className="award-widget__issuer">2026 Business Excellence Achievement Awards</span>
          <span className="award-widget__title">New Business of the Year Finalist</span>
          <span className="award-widget__status">Maple Jiu-Jitsu</span>
        </div>
      </div>
    </div>
  )
}
