import '../Stylesheets/Coaches.css'
import Belt from './Belt'
import { useState, useEffect } from 'react'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Coach({ coach }){
    const [showProfile, setShowProfile] = useState(false)
    const [slide, setSlide] = useState(false)
    const toggleShowProfile = () => {
        setShowProfile(prev => !prev)
    }

 
    return(
        <div onClick={toggleShowProfile} className="coach-container animate">
<div className={`image-overlay ${coach.name === "Arthur" ? 'left' : ''}`}>
   
          <div className='half'>
             
          <div>
             {coach.accomplishments.map((acc, index)=>{
                    return(
                        <p className='accomplishment' key={index}>{acc}</p>
                    )
                })} </div>
                </div>
       
            </div>
            <div className='coach-photo'>
                <img alt='Brazillian Jiu-Jitsu Instructor' src={coach.image} />
            </div>
            <div>
                <div className='name-and-ig'>
                <p className='coach-nm'> {coach.name}</p> 
            <a 
             href={coach.link}
            target="_blank"
                rel="noopener noreferrer"
             aria-label="Visit Instagram">   <FontAwesomeIcon className='ig-icon' icon={faInstagram} /> </a>
         
            </div>
            </div>

            <div className='coach-belt'>
                <Belt belt={coach.belt} />
            </div>

        </div>
    )

}