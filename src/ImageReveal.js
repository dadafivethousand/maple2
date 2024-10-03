import React, { useState, useEffect } from 'react';
import './Stylesheets/ImageReveal.css';
import logo from './Media/image.png'; // Ensure the correct path to the image
import FoundersForm from './FoundersForm';

export default function ImageReveal() {
    const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length === 3) {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, 700); // Every 500ms, add a dot or reset

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);

 

  return (
    <div className='image-reveal-container'>
     
      <div className='image-container'>
        {/* Image to be revealed */}
        <img src={logo} alt="Logo" />
        {/* Overlay that will shrink to reveal the image */}
 
      </div>
      <h2>Coming soon <span style={{ display: 'inline-block', width: '20px', textAlign: 'left' }}>{dots}</span></h2>
      <FoundersForm />
    </div>
  );
}
