import Belt from "./Belt"
import "./Stylesheets/Coach.css"
import {useState} from 'react'

export default function Coach({coach}) {

    const [showProfile, setShowProfile] = useState(false)

    const toggleShowProfile = () => setShowProfile(prev=>!prev)


    return(
        <div className="CoachContainer">
 
        <div onClick={toggleShowProfile} className="Coach">
        
        <img className="ProfilePic" src={coach.image} />
        { showProfile? <div className="Profile">
        <div className="Name">   {coach.name}  </div><br></br>
            {coach.description} <br></br>
            {coach.accomplishments ? (
  <ul className="AccomplishmentsList">
    {coach.accomplishments.map((acc, index) => (
      <li key={index}>{acc}</li>
    ))}
  </ul>
) : null}


        </div>:null}
        
     
        <Belt belt={coach.belt} />
  
    </div>
    </div>
    )
}