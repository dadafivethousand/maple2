import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import './Stylesheets/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import InlineLeadForm from "./Components/InlineLeadForm";

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [showGetStarted, setShowGetStarted] = useState(false);
    const location = useLocation();
    const root = location.pathname === '/' ? '' : '/';

    const isSummerCamp = location.pathname === '/camp';

    const changeExpand = () => {
        if (isSummerCamp) return;
        if (window.scrollY >= 400) {
            setShowGetStarted(true);
        } else {
            setShowGetStarted(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeExpand);
        return () => window.removeEventListener('scroll', changeExpand);
    }, []);

    const handleClick = () => setClick((prev) => !prev);

    return (
        <div className="navbar-outer-container">

            {/* Mobile-only phone strip */}
            <a className="nav-phone-top" href="tel:+16478879940">
                <span className="nav-phone-label"><FontAwesomeIcon icon={faPhone} /> CALL NOW</span>
                <span className="nav-phone-number">(647) 887-9940</span>
            </a>

            <div className="navbar-container">

                {/* Brand — left on desktop, centred on mobile */}
                <div className={`image-and-logo ${click ? 'borderless disappear' : 'show'}`}>
                    <div className="nav-brand">
                        <span className="nav-brand-maple">MAPLE</span>
                        <span className="nav-brand-rule" aria-hidden="true"></span>
                        <span className="nav-brand-sub">JIU-JITSU</span>
                    </div>
                </div>

                {/* Nav panel — slide-out on mobile, inline on desktop */}
                <div className={`navbar ${click ? 'slide' : ''}`}>

                    {/* Inline form — slides in on scroll (desktop) */}
                    <div className={`${showGetStarted ? 'show-get-started' : ''} getstarted`}>
                        <InlineLeadForm />
                    </div>

                    {/* Desktop-only: phone + socials row */}
                    <div className="nav-desktop-meta">
                        <a className="nav-desktop-phone" href="tel:+16478879940">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>(647) 887-9940</span>
                        </a>
                        <div className="nav-desktop-socials">
                            <a href="https://www.instagram.com/maple_bjj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nav-social-link nav-social-link--ig">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.facebook.com/p/Maple-Jiu-Jitsu-61567823767391/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="nav-social-link nav-social-link--fb">
                                <FontAwesomeIcon icon={faSquareFacebook} />
                            </a>
                        </div>
                    </div>

                    <ul className="navbar-options">
                        <div className={`nav-brand nav-brand--menu ${click ? 'show' : 'disappear'}`}>
                            <span className="nav-brand-maple">MAPLE</span>
                            <span className="nav-brand-rule" aria-hidden="true"></span>
                            <span className="nav-brand-sub">JIU-JITSU</span>
                        </div>
                        <a href={`${root}#Schedule`}><li onClick={() => setClick(false)}>Schedule</li></a>
                        <a href={`${root}#Coaches`}><li onClick={() => setClick(false)}>Coaches</li></a>
                        <a href={`${root}#Memberships`}><li onClick={() => setClick(false)}>Sign Up</li></a>
                        <a href={`${root}#FAQ`}><li onClick={() => setClick(false)}>FAQ</li></a>
                        <a href={`${root}#Contact`}><li onClick={() => setClick(false)}>Contact Us</li></a>
                    {/*   <a href="/camp"><li onClick={() => setClick(false)}>Summer Camp</li></a> */}
                     </ul>
                </div>
            </div>

            <div className="hamburger" onClick={handleClick}>
                {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>

        </div>
    )
}
