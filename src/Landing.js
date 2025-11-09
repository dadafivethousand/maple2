import './Stylesheets/Landing.css'
import GetStarted from './Components/GetStarted'
import { useEffect, useState } from 'react'
import bg1 from './Media/IMG_4662.JPG'
import bg2 from './Media/womensclass.JPG'
import bg3 from './Media/kids.jpg'
import bg4 from './Media/mt.jpg'
import bg5 from './Media/Arteen.JPG'
import bg6 from './Media/Tony.jpg'
import bg7 from './Media/truck.JPG'
import bg8 from './Media/Iverson.JPG'
export default function Landing() {
  const images = [
                { src: bg6, alt: "Boxing" },

  { src: bg2, alt: "Women's class" },
    { src: bg1, alt: "BJJ class" },
    { src: bg3, alt: "Kids' class" },
        { src: bg4, alt: "Muay Thai class" },
              { src: bg5, alt: "MMA" },
    
                               { src: bg7, alt: "Truck" },
                                        { src: bg8, alt: "Iverson" },
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
          className={`landing-slide ${i === index ? "is-visible" : ""}`}
          style={{ transitionDuration: `${transition}ms` }}
          loading="lazy"
          decoding="async"
        />
      ))}
 
      {/* main content */}
      <div className='image-container'>
        <GetStarted size='large' />
      </div>
    </div>
  )
}
