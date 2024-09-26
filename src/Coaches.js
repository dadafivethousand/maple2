import "./Stylesheets/Coaches.css"
import CoachesList from "./CoachesObject"
import Coach from "./Coach"

 

export default function Coaches(){
    return(<div id="Coaches" className="CoachesContainer">
 
        <h1 className="CoachesIntro animate">
        
         Come train Brazillian Jiu-Jitsu with some of <span className="Crimson">Canada's </span>  best!
        </h1>
        <h2 className="animate">Our team of coaches is committed to providing top-level BJJ instruction in a safe, inclusive, and professional environment.</h2>
        <div className="Coaches">
        {CoachesList.map((coach, index)=>{
            return(
                 <Coach coach={coach} />
            )
        })}
        </div>

       



    </div>)
}