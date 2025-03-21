import { useState, useEffect } from "react"
export default function Program( {program} ){
 
 
    return(
        <div   className="program-container animate">
         <div className="overlay">     <h2>{program.name}</h2>
         <p>{program.description}</p>
         {program.link?
             <a className="book-private" href={program.link} target="_blank">
                Book Now
             </a>:null        }
          </div>
             <div className='program-image'>
                <img alt={program.name} src={program.image} loading="lazy" />
             </div>

        
 
             </div>
    )
}