import './Stylesheets/Landing.css'

import GetStarted from './Components/GetStarted'
import Testimonials from './Components/Testimonials'
 
export default function Landing(){
    return(
        <div className="landing-container">
         
        <div className='image-container'>
             {/*  <div className='before'></div>
            <img  className='max' src={bg} alt='Brazillian Jiu-Jitsu BJJ Black Belt' loading="lazy" />
             
         */}       
                  <GetStarted size='large' />
    
  
 
            </div>
          
        </div>
    )
}