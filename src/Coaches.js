import { useState, useEffect } from "react";
import CoachesList from './Objects/CoachesObject'
import Coach from "./Components/Coach";
import './Stylesheets/Coaches.css'
export default function Coaches() {
    return(
        <div id='Coaches' className="coaches-container">
      
            
       <div className="coaches-intro">
       <h1 > Coaches </h1>
       <p>Our team of coaches is led by one of Canada's top black belts, and is committed to providing top-level BJJ instruction in a safe, inclusive, and professional environment. </p>
       </div>
       <div className="coaches">
            {
                CoachesList.map((coach, index)=>{
                  return ( <Coach key={index} coach={coach} />)
                }
            )
            }
            </div>
        </div>
    )

}