import '../Stylesheets/Coaches.css'
import Belt from './Belt'
import { useState, useEffect } from 'react'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 

export default function Coach({ coach }){
  
    const [slide, setSlide] = useState(false)
 

 
    return(
        <div   className="coach-container animate">
            <div>
            <div className='coach-photo'>
                <img alt='Brazillian Jiu-Jitsu Instructor' src={coach.image} />
            </div>
            <div>
                <div className='name-and-ig'>
                <p className='coach-nm'> {coach.name}</p> 
            {    coach.link?
            <a 
             href={coach.link}
            target="_blank"
                rel="noopener noreferrer"
             aria-label="Visit Instagram">   <FontAwesomeIcon className='ig-icon' icon={faInstagram} /> 
             </a> : null}
         
            </div>
            </div>
            </div>
            <div className='coach-description'>
               {coach.description}

{/* 
               {coach.headinstructor? 
               <div className="lineage">
               <p> <span className='bold'>BJJ Lineage </span> <br></br> Helio Gracie ➡ Royler Gracie ➡ Saulo Ribeiro/Vini Aieta ➡ Jorge Britto ➡ Max Li </p>
                <Belt belt="Black Belt"/> 
                </div>
                : null} */}
                
            </div>

        </div>
    )

}