import './Stylesheets/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div id="Contact" className="ContactContainer">
      <h1>Contact</h1>
      <div className='contact-flexbox'>
      <div>
        <div className="contact-icons">
          <h2>Call us, Email us, drop by</h2>

          <div className="Phone contact-content ">
            <FontAwesomeIcon icon={faPhone} />
            <span className="contact-text contact-icon-text">(647) 887-9940</span>
          </div>

          <div className="Email contact-content">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="contact-text contact-icon-text">admin@maplebjj.com</span>
          </div>

          <div className="Address contact-content">
            <FontAwesomeIcon icon={faHome} />
            <span className="contact-text contact-icon-text">20 Cranston Park Ave, Maple, ON L6A 2W2</span>
          </div>
        </div>

        <div className="social-media-icons">
          <h2>Follow us on Social Media</h2>

          <div className="instagram-and-facebook contact-content">
            <a
              href="https://www.instagram.com/maple_bjj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram"
            >
              <FontAwesomeIcon className="ig-icon" icon={faInstagram} />
            </a>

            <a
              href="https://www.facebook.com/p/Maple-Jiu-Jitsu-61567823767391/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maple BJJ on Facebook"
            >
              <FontAwesomeIcon className="fb-icon" icon={faSquareFacebook} />
            </a>
          </div>
        </div>
      </div>

      <div className="ContactInfo-and-map">
        <h2>Conveniently located in the Cranston Park Plaza</h2>
        <div className="Map contact-content">
          <p className='contact-text map-text'> 
            On-site parking, convenient access from Highway 400, and close proximity to public transit — YRT Route 26.
          </p>

          <iframe
         
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5753.745592517753!2d-79.52707872336161!3d43.85846513913016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b28dcfad05e9f%3A0x3fb7744672a4baaf!2s20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2!5e0!3m2!1sen!2sca!4v1727071148717!5m2!1sen!2sca"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map to Maple BJJ"
          ></iframe>
        </div>
      </div>
      </div>
    </div>
  );
}
