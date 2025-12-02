import './Stylesheets/Landing.css'
import GetStarted from './Components/GetStarted'
import Testimonials from './Components/Testimonials'
import { useEffect, useState } from 'react'
import bg1 from './Media/IMG_4662.JPG'
import bg2 from './Media/womensclass.jpeg'
import bg3 from './Media/kids.jpeg'
import bg4 from './Media/mt.jpg'
import bg5 from './Media/anotheropenmat.jpg'
import bg6 from './Media/Tony.jpg'
 
import bg7 from './Media/24_mapleJiujitsuStills-18.jpg'

import bg8 from './Media/kidstwo.jpg'
 
import bg9 from './Media/openmat.jpg'
import bg10 from './Media/scott.jpg'
import bg11 from './Media/bags.jpg'
import bg12 from './Media/competition.jpg'
import bg13 from './Media/sixkids.jpg'

import bg14 from './Media/womensone.jpg'
import bg15 from './Media/womenstwo.jpg'
import bg16 from './Media/fivewomen.jpg'
import bg17 from './Media/giclass.jpg'
import bg18 from './Media/eamonn.jpg'
import bg19 from './Media/ryan.jpg'
 import bg20 from './Media/maxjuliusartur.jpg'
  import bg21 from './Media/canadiannationals.jpg'
 
 
export default function Landing() {
  const images = [
                { src: bg6, alt: "Boxing" },

  { src: bg2, alt: "Women's class" },
    { src: bg1, alt: "BJJ class" },
    { src: bg3, alt: "Kids' class", right:true },
        { src: bg4, alt: "Muay Thai class" },
                 { src: bg16, alt: "Womens Martial Arts", right:true },
              { src: bg5, alt: "MMA" },
            { src: bg7, alt: "Martial Arts" },
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
