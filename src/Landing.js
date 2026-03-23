import './Stylesheets/Landing.css'
import LeadForm from './LeadForm'
import Coaches from './Coaches'
import Testimonials from './Components/Testimonials'

import t1 from './Media/ibjjf.webp'
import t2 from './Media/giclass.webp'
import t3 from './Media/openmat.webp'
import t4 from './Media/competition.webp'
import t5 from './Media/womensclass.webp'
import t6 from './Media/anotheropenmat.webp'
import t7 from './Media/kids.webp'
 
import t9 from './Media/womensone.webp'
import t10 from './Media/kidstwo.webp'

const TICKER_IMGS = [t1, t2, t3, t4, t5, t6, t7, t9, t10];

export default function Landing() {
  return (
    <div className="landing-page">
      <section className="landing-hero">

        {/* Desktop-only photo ticker — sits behind the form */}
        <div className="hero-ticker" aria-hidden="true">
          <div className="hero-ticker__track">
            {/* First set */}
            {TICKER_IMGS.map((src, i) => (
              <img key={`a-${i}`} src={src} alt="" draggable="false" />
            ))}
            {/* Duplicate for seamless loop */}
            {TICKER_IMGS.map((src, i) => (
              <img key={`b-${i}`} src={src} alt="" draggable="false" />
            ))}
          </div>
          <div className="hero-ticker__overlay" />
        </div>

        <LeadForm inline={true} />
      </section>

      <Coaches />
      <Testimonials />
    </div>
  )
}
