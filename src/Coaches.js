import "./Stylesheets/Coaches.css"
import CoachesList from "./CoachesObject"
import Coach from "./Coach"

const BlackBelt = () => (
    <div className='Belt'>
        {[...Array(5)].map((_, i) => <div key={i} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='red'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='black'></div>)}
    </div>
);
const BrownBelt = () => (
    <div className='Belt'>
        {[...Array(5)].map((_, i) => <div key={i} className='brown'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='brown'></div>)}
    </div>
);
 
const BlueBelt = () => (
    <div className='Belt'>
        {[...Array(5)].map((_, i) => <div key={i} className='blue'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 5} className='black'></div>)}
        {[...Array(2)].map((_, i) => <div key={i + 7} className='blue'></div>)}
    </div>
);


export default function Coaches(){
    return(<div id="Coaches" className="CoachesContainer">
 
        <h1 className="CoachesIntro">
        
         Come train Brazillian Jiu-Jitsu with some of <span className="Crimson">Canada's </span>  best!
        </h1>
        <h2>Our team of coaches is committed to providing top-level BJJ instruction in a safe, inclusive, and professional environment.</h2>
        <div className="Coaches">
        {CoachesList.map((coach, index)=>{
            return(
                 <Coach coach={coach} />
            )
        })}
        </div>

       



    </div>)
}