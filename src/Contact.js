import './Stylesheets/Contact.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from './Media/logo.png'


export default function Contact() {
    return(
        <div className='ContactContainer'> 
     
        <div className='ContactInfo-and-map'>
          <div>
            <h2>Conveniently Located     In the Heart of <span className='Crimson'> Maple </span> </h2>
            <ul>
            <li>Plenty of parking</li>
              <li>Minutes away from Highway 400</li>
              <li>Steps from publit transit (YRT Route 26)</li>
         
             
            </ul>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5753.745592517753!2d-79.52707872336161!3d43.85846513913016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b28dcfad05e9f%3A0x3fb7744672a4baaf!2s20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2!5e0!3m2!1sen!2sca!4v1727071148717!5m2!1sen!2sca" 
          allowfullscreen="" 
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
     </div>
        <div className='Contact'>
          <h1>Contact Us</h1>
        <div className='Phone'>
        <FontAwesomeIcon icon={faPhone} />  {/* Phone icon */}
        <span> (647) 887-9940</span>
        </div>
        <div className='Email'>
        <FontAwesomeIcon icon={faEnvelope} />{/* Envelope icon */}
        <span> admin@maplejj.com</span>

        </div>
        <div className='Address'>
        <FontAwesomeIcon icon={faHome} /> {/* House icon */}
        <span>20 Cranston Park Ave <br></br>
        <span className='Indent'>Maple, ON L6A 2W2 </span> </span>        
        </div>
        </div>


        </div>

        
        </div>
    )
}