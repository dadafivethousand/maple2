import { useState, useEffect } from "react";
import CoachesList from './Objects/CoachesObject'
import Coach from "./Components/Coach";
import './Stylesheets/Coaches.css'
export default function Coaches() {
    return(
        <div id='Coaches' className="coaches-container">
      
            
       <div className="coaches-intro">
       <h1 > Coaches </h1>
       <p>  At Maple BJJ, our coaches bring years of experience in both grappling and striking, ensuring top-tier instruction for all skill levels. With backgrounds in Brazilian Jiu-Jitsu, wrestling, Muay Thai, and MMA, they’ve competed at the highest levels and are dedicated to helping you reach your goals—whether it’s self-defense, competition, or just getting in great shape. Train with the best and take your skills to the next level!  </p>
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