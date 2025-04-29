import './Stylesheets/Landing.css'
 
import bg from './Media/Maple Jiujitsu-19.jpg'
import bg3 from './Media/Maple Jiujitsu-5.jpg'
import bg2 from './Media/Maple Jiujitsu-11 (1).jpg'

import GetStarted from './Components/GetStarted'
import Testimonials from './Components/Testimonials'
import LeadForm from './LeadForm'
export default function Landing(){
    return(
        <div className="landing-container">
         
        <div className='image-container'>
             {/*  <div className='before'></div>
            <img  className='max' src={bg} alt='Brazillian Jiu-Jitsu BJJ Black Belt' loading="lazy" />
             
         */}       
            <Testimonials />
           
  
 
            </div>
          
        </div>
    )
}