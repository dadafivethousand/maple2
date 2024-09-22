import './Stylesheets/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import logo from './Media/logo.png'
export default function Navbar(){
    return (
        <div className='NavbarContainer'>
 
            
           <ul className='Navbar'>
           <img src={logo} />
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