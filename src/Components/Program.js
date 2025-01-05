import { useState, useEffect } from "react"
export default function Program( {program} ){
 
 
    return(
        <div   className="program-container animate">
         <div className="overlay">     <h2>{program.name}</h2>
         <p>{program.description}</p>
         {program.button?
             <a className="book-private" href='https://maplejiujitsu.setmore.com/services/ce9112be-2765-4a91-a8c7-d8d923ac6c5a' target="_blank">
                Book Now
             </a>:null        }
          </div>
             <div className='program-image'>
                <img alt={program.name} src={program.image} />
             </div>

        
 
             </div>
    )
}