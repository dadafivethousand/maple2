import { useState, useEffect, useRef } from 'react'
import './Stylesheets/Landing.css'
import LeadForm from './LeadForm'
import AwardWidget from './Components/AwardWidget'

import t1 from './Media/ibjjf.webp'
import t2 from './Media/giclass.webp'
import t3 from './Media/openmat.webp'
import t4 from './Media/competition.webp'
import t5 from './Media/womensclass.webp'
import t6 from './Media/anotheropenmat.webp'
import t7 from './Media/kids.webp'
import t11 from './Media/DSC_7821.webp'

const TICKER_IMGS = [t1, t2, t3, t4, t5, t6, t7, t11];

export default function Landing() {
  const [tickerReady, setTickerReady] = useState(false);
  const loadedCount = useRef(0);

  const onImgLoad = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= TICKER_IMGS.length) {
      setTickerReady(true);
    }
  };

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="hero-ticker" aria-hidden="true">
          <div className={`hero-ticker__track${tickerReady ? ' hero-ticker__track--ready' : ''}`}>
            {TICKER_IMGS.map((src, i) => (
              <img key={`a-${i}`} src={src} alt="" draggable="false" onLoad={onImgLoad} />
            ))}
            {TICKER_IMGS.map((src, i) => (
              <img key={`b-${i}`} src={src} alt="" draggable="false" />
            ))}
          </div>
          <div className="hero-ticker__overlay" />
        </div>

        <AwardWidget />

        <div className="hero-title">
          <h2 className="hero-name">Maple Jiu-Jitsu</h2>
          <p className="hero-pretitle">20 Cranston Park Ave, Maple, ON</p>
          <p className="hero-disciplines">BJJ · Muay Thai · Wrestling · MMA</p>
        </div>

        <LeadForm inline={true} />
      </section>
    </div>
  )
}
