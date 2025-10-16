import './Stylesheets/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div id="Contact" className="ContactContainer">
      <h1>Contact</h1>

      <div className="contact-flexbox">
        <div>
          <div className="contact-icons">
            {/* Phone -> tel: */}
            <a
              className="Phone contact-content"
              href="tel:+16478879940"
              aria-label="Call Maple BJJ"
            >
              <FontAwesomeIcon icon={faPhone} />
              <span className="contact-text contact-icon-text">(647) 887-9940</span>
            </a>

            {/* Email -> mailto: */}
            <a
              className="Email contact-content"
              href="mailto:admin@maplebjj.com?subject=Inquiry%20from%20Website"
              aria-label="Email Maple BJJ"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="contact-text contact-icon-text">admin@maplebjj.com</span>
            </a>

            {/* Address -> Google Maps directions */}
            <a
              className="Address contact-content"
              href="https://www.google.com/maps/dir/?api=1&destination=20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directions to Maple BJJ"
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="contact-text contact-icon-text">
                20 Cranston Park Ave, Maple, ON L6A 2W2
              </span>
            </a>
          </div>

          <div className="social-media-icons">
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
          <div className="Map contact-content">
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
