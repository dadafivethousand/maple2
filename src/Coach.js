import "./Stylesheets/Coach.css"

export default function Coach({coach}) {


    return(
        <div className="CoachContainer">
 
        <div className="Coach">
        
        <img className="ProfilePic" src={coach.image} />
        <h4>{coach.name}   {coach.headinstructor? "- Head Instructor":''}</h4>
  
    </div>
    </div>
    )
}