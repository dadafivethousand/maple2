import Belt from "./Belt"
import "./Stylesheets/Coach.css"
import {useState} from 'react'

export default function Coach({coach}) {


    return(
        <div className="CoachContainer">
 
        <div className="Coach">
        
        <img className="ProfilePic" src={coach.image} />
        
     
        <Belt belt={coach.belt} />
  
    </div>
    </div>
    )
}