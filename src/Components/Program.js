import { useState, useEffect } from "react"
export default function Program( {program} ){
 
 
    return(
        <div   className="program-container animate">
         <div className="overlay">     <h2>{program.name}</h2>
         <p>{program.description}</p> </div>
             <div className='program-image'>
                <img alt={program.name} src={program.image} />
             </div>
         
             <div className='program-title'>
                </div>
 
             </div>
    )
}