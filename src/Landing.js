import './Stylesheets/Landing.css'
import GetStarted from './Components/GetStarted'
import Testimonials from './Components/Testimonials'
import { useEffect, useState } from 'react'
import bg1 from './Media/IMG_4662.webp'
import bg2 from './Media/womensclass.webp'
import bg3 from './Media/kids.webp'
 
import bg5 from './Media/anotheropenmat.webp'
import bg6 from './Media/Tony.webp'
 
 

import bg8 from './Media/kidstwo.webp'
 
import bg9 from './Media/openmat.webp'
import bg10 from './Media/scott.webp'
import bg11 from './Media/bags.webp'
import bg12 from './Media/competition.webp'
import bg13 from './Media/sixkids.webp'

import bg14 from './Media/womensone.webp'
import bg15 from './Media/womenstwo.webp'
import bg16 from './Media/fivewomen.webp'
import bg17 from './Media/giclass.webp'
import bg18 from './Media/eamonn.webp'
import bg19 from './Media/ryan.webp'
 import bg20 from './Media/maxjuliusartur.webp'
  import bg21 from './Media/canadiannationals.webp'
 
 
export default function Landing() {
  const images = [
                { src: bg6, alt: "Boxing" },

  { src: bg2, alt: "Women's class" },
    { src: bg1, alt: "BJJ class" },
    { src: bg3, alt: "Kids' class", right:true },
 
                 { src: bg16, alt: "Womens Martial Arts", right:true },
              { src: bg5, alt: "MMA" },
          
                { src: bg14, alt: "Women's BJJ" },
          
                                  { src: bg8, alt: "More Kids", right:true },
                                              { src: bg9, alt: "BJJ"},
                                                      { src: bg10, alt: "Jiu-Jitsu"},
 
      { src: bg12, alt: "Competition", top:true},
         { src: bg15, alt: "Womens Jiu-Jitsu" },
       
      { src: bg13, alt: "kids jiu-jitsu"},
        { src: bg17, alt: "gi class" },
              { src: bg18, alt: "nogi class" },
                        { src: bg19, alt: "gold medal" },
                                { src: bg20, alt: "mma fighters" },
                                   { src: bg21, alt: "canadian nationals" },



                
    // Add more slides here if needed
  ]

  const interval = 3500 // ms per slide
  const transition = 1000 // fade duration in ms
  const [index, setIndex] = useState(0)
  const n = images.length

  // Cycle slides endlessly
  useEffect(() => {
    if (n <= 1) return

    const timer = setTimeout(() => {
      setIndex(i => (i + 1) % n)
    }, interval)

    return () => clearTimeout(timer)
  }, [index, n, interval])

  // Preload next slide
  useEffect(() => {
    if (n <= 1) return
    const nextIndex = (index + 1) % n
    const img = new Image()
    img.src = images[nextIndex].src
  }, [index, images, n])

  return (
    <div className="landing-container">
      {/* slideshow images */}
      {images.map((img, i) => (
        <img
 
          key={i}
          src={img.src}
          alt={img.alt || ""}
          className={`landing-slide ${i === index ? "is-visible" : ""} ${img.right ? "image-right" : ""} ${img.top ? "image-top" : ""}`}
          style={{ transitionDuration: `${transition}ms` }}
          loading="lazy"
          decoding="async"
        />
      ))}
 
      {/* main content */}
      <div className='image-container'>
        <GetStarted size='large' />
        <Testimonials />
      </div>
    </div>
  )
}
