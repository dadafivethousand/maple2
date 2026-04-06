import './Stylesheets/Contact.css';
import './Stylesheets/SectionHeading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div id="Contact" className="ContactContainer">
      <p className="section-heading">
        <span className="sh-kicker">Always Happy To Talk</span>
        <span className="sh-main">Contact</span>
      </p>

      {/* ── Map-as-background scene ── */}
      <div className="contact-scene">

        <iframe
          className="contact-scene__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5753.745592517753!2d-79.52707872336161!3d43.85846513913016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b28dcfad05e9f%3A0x3fb7744672a4baaf!2s20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2!5e0!3m2!1sen!2sca!4v1727071148717!5m2!1sen!2sca"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map to Maple BJJ"
        />

        {/* gradient fade: solid dark on left → transparent → map on right */}
        <div className="contact-scene__overlay" />

        {/* contact panel floats over the dark left side */}
        <div className="contact-panel">

          <div className="contact-panel__eyebrow">Maple Jiu-Jitsu Academy</div>

          <div className="contact-details">
            <a className="contact-detail" href="tel:+16478879940" aria-label="Call Maple BJJ">
              <FontAwesomeIcon icon={faPhone} />
              <span>(647) 887-9940</span>
            </a>

            <a
              className="contact-detail"
              href="mailto:admin@maplebjj.com?subject=Inquiry%20from%20Website"
              aria-label="Email Maple BJJ"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>admin@maplebjj.com</span>
            </a>

            <a
              className="contact-detail"
              href="https://www.google.com/maps/dir/?api=1&destination=20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directions to Maple BJJ"
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span>20 Cranston Park Ave, Maple ON</span>
            </a>
          </div>

          <div className="contact-social">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=20%20Cranston%20Park%20Ave%2C%20Maple%2C%20ON%20L6A%202W2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Maple BJJ"
              className="contact-social__link contact-social__link--directions"
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Get Directions</span>
            </a>
            <a
              href="https://www.instagram.com/maple_bjj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="contact-social__link contact-social__link--ig"
            >
              <FontAwesomeIcon icon={faInstagram} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/p/Maple-Jiu-Jitsu-61567823767391/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="contact-social__link contact-social__link--fb"
            >
              <FontAwesomeIcon icon={faSquareFacebook} />
              <span>Facebook</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
