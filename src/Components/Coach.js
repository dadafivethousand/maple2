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
                <img alt='Brazillian Jiu-Jitsu Instructor' src={coach.image} loading="lazy" />
            </div>
{/*
            { !coach.headInstructor && 
           <a className='privates' target="_blank"
           rel="noopener noreferrer"  href={coach.setmoreLink}>
                <div className='green-circle'>

                </div>
                <div className='privates-text'>
         <p>Available for Private Training -  <span className='click-to-book'>Click to book</span></p>
                </div>
            </a>}

            */}
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
                {coach.headInstructor}

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