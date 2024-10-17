import './Stylesheets/Landing.css'
import artur from './Media/Artur.png'
import gracie from './Media/gracie.webp'
import leaf from './Media/leaff.png'
export default function Landing(){
    return(
        <div className="landing-container">
        <div className='image-container'>
            <div className='before'></div>
            <img className='artur' src={artur}
            />
 
 
            </div>
          
        </div>
    )
}