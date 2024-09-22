import './Stylesheets/Contact.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Contact() {
    return(
        <div className='ContactContainer'> 
        <h1 >
        Contact Us
        </h1>
        <div className='ContactInfo'>
        <div className='Phone'>
        <i className="fas fa-phone"></i> {/* Phone icon */}
        <span>(647) 887-9940</span>

        </div>
        <div className='Email'>
        <i className="fas fa-envelope"></i> {/* Envelope icon */}
        <span>admin@maplejj.com</span>

        </div>
        <div className='Address'>
        <i className="fas fa-home"></i> {/* House icon */}
        <span>20 Cranston Park Ave <br></br>
        Maple, ON L6A 2W2</span>
        
        </div>

        </div>

        
        </div>
    )
}