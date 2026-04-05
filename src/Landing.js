import './Stylesheets/Landing.css'
import LeadForm from './LeadForm'
import Coaches from './Coaches'
import Testimonials from './Components/Testimonials'

import t1 from './Media/ibjjf.webp'
import t2 from './Media/giclass.webp'
import t3 from './Media/openmat.webp'
import t4 from './Media/competition.webp'
import t5 from './Media/womensclass.jpg'
import t6 from './Media/anotheropenmat.webp'
import t7 from './Media/kids.webp'
 
 
import t10 from './Media/kidstwo.webp'
import t11 from './Media/DSC_7821.webp'

const TICKER_IMGS = [t1, t2, t3, t4, t5, t6, t7,  t10, t11];

export default function Landing() {
  return (
    <div className="landing-page">
      <section className="landing-hero">

        {/* Photo ticker — sits behind the form */}
        <div className="hero-ticker" aria-hidden="true">
          <div className="hero-ticker__track">
            {TICKER_IMGS.map((src, i) => (
              <img key={`a-${i}`} src={src} alt="" draggable="false" />
            ))}
            {TICKER_IMGS.map((src, i) => (
              <img key={`b-${i}`} src={src} alt="" draggable="false" />
            ))}
          </div>
          <div className="hero-ticker__overlay" />
        </div>

        <div className="hero-award">
          <span className="hero-award__trophy" aria-hidden="true">🏆</span>
          <div className="hero-award__body">
            <span className="hero-award__title">New Business of the Year &mdash; Finalist</span>
            <span className="hero-award__sub">Vaughan Chamber of Commerce</span>
          </div>
          <span className="hero-award__trophy" aria-hidden="true">🏆</span>
        </div>

        <div className="hero-title">

          <h2 className="hero-name">Maple Jiu-Jitsu</h2>
                    <p className="hero-pretitle">20 Cranston Park Ave, Maple, ON</p>
          <p className="hero-disciplines">BJJ &nbsp;·&nbsp; Muay Thai &nbsp;·&nbsp; Wrestling &nbsp;·&nbsp; MMA</p>
        </div>

        <LeadForm inline={true} />
      </section>

      <Coaches />
      <Testimonials />
    </div>
  )
}
