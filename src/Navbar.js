import './Stylesheets/Navbar.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from './Media/logo.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
 
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
            <div className='NavbarButtons'>
   
     

            <div className='PhoneIcon'> <FontAwesomeIcon icon={faPhone}/> (647)887-9940 </div>
      
          
            <button className="GetStartedButton">Sign Up <br></br>  </button>
            <button className="ViewPlansButton"> View Prices</button>
            </div>
           </ul>

       
         
        </div>
    )
}