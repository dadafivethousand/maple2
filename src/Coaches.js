import { useState, useEffect } from "react";
import CoachesList from './Objects/CoachesObject'
import Coach from "./Components/Coach";
import './Stylesheets/Coaches.css'
export default function Coaches() {
    return(
        <div id='Coaches' className="coaches-container">
        <div className="coaches-intro">
             <h1 className="animate">
        
        Come train Brazillian Jiu-Jitsu with some of <span className="crimson">Canada's </span>  best!
       </h1>
       <p className="animate">Our team of coaches is committed to providing top-level BJJ instruction in a safe, inclusive, and professional environment. Click on each photo to learn more.</p>
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