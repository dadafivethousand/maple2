import { useState, useEffect } from "react"
import './Stylesheets/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faPhone } from '@fortawesome/free-solid-svg-icons';
import GetStarted from "./Components/GetStarted";
import newlogo from "./Media/newlogo.webp"


export default function Navbar() {
    const [click, setClick] = useState(false);
    const [showGetStarted, setShowGetStarted] = useState(false);

    const changeExpand = () => {
        if (window.scrollY >= 400) {
            setShowGetStarted(true);
        } else {
            setShowGetStarted(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeExpand);
        return () => {
            window.removeEventListener('scroll', changeExpand);
        };
    }, []);

    const handleClick = () => {
        setClick((prev) => !prev)
    }

    return (
        <div className="navbar-outer-container">
            <div className="hamburger" onClick={handleClick}>
                {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>
            <div className="navbar-container">
                <div className={`image-and-logo ${click ? 'borderless' : ''}`}>
                    <img className="new-logo" src={newlogo} />
                </div>
                <div className={`navbar ${click ? 'slide' : ''}`}>
                    <div className={`${showGetStarted ? 'show-get-started' : ''} getstarted`}>
                        <GetStarted />
                    </div>
                    <ul className="navbar-options">
                        <img className={`new-logo-bottom ${click ? 'show' : 'disappear'}`} src={newlogo} />
                        <a href='#Schedule'><li onClick={() => setClick(false)}>Schedule</li></a>
                        <a href='#Coaches'><li onClick={() => setClick(false)}>Coaches</li></a>
                        <a href='#Memberships'><li onClick={() => setClick(false)}>Sign Up</li></a>
                        <a href='#FAQ'><li onClick={() => setClick(false)}>FAQ</li></a>
                        <a href='#Contact'><li onClick={() => setClick(false)}>Contact Us</li></a>
                        <a href='/blog'><li onClick={() => setClick(false)}>Blog</li></a>
                        <a className="nav-phone" href='tel:+16478879940' onClick={() => setClick(false)}>
                            <li><FontAwesomeIcon icon={faPhone} /> (647) 887-9940</li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    )
}
