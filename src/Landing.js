import './Stylesheets/Landing.css'
 
import bg from './Media/bg.jpeg'
import GetStarted from './Components/GetStarted'
import Testimonials from './Components/Testimonials'
export default function Landing(){
    return(
        <div className="landing-container">
        <div className='image-container'>
            <div className='before'></div>
            <img  className='max' src={bg} alt='Brazillian Jiu-Jitsu BJJ Black Belt' loading="lazy" />
         
            <div className='get-started-landing-container'>
            <GetStarted size='large' />
             <Testimonials />
 
 

 
            </div>
          
 
 
            </div>
          
        </div>
    )
}