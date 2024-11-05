import './Stylesheets/Landing.css'
 
import bg from './Media/bg.jpeg'
import GetStarted from './Components/GetStarted'
export default function Landing(){
    return(
        <div className="landing-container">
        <div className='image-container'>
            <div className='before'></div>
            <img className='max' src={bg} alt='BJJ Black Belt'
            />
            <div className='get-started-landing-container'>
            <GetStarted size='large' />
            </div>
          
 
 
            </div>
          
        </div>
    )
}