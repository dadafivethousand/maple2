import './Stylesheets/Navbar.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './Media/logo.png'
export default function Navbar(){

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 800) {
                setShowMenu(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
     }, []);
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };
    return (
        <div className='NavbarContainer'> 
        
        <div className='LogoAndHamburger' onClick={toggleMenu}>
        <img src={logo} alt="Maple Jiujitsu" />
        <div className='HamburgerMenu'>
           {showMenu ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </div>             
        </div>
           <ul className={`${showMenu? 'show': ''} NavbarList`}>
            <li>About</li>
            <li>Instructors</li>
            <li>Schedule</li>
            <li>F.A.Q.</li>
            <li>Contact Us</li>
            <li>Members</li>
           </ul>
         
        </div>
    )
}