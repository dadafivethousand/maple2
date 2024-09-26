import './Stylesheets/Navbar.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTimes, faBars, faUser} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


import logo from './Media/leaf.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import FacebookLoginButton from './FacebookLoginButton';
 
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
          <a href='#About' >   <li onClick={()=>setShowMenu(false)}>About</li></a>
          <a href='#Coaches'>   <li onClick={()=>setShowMenu(false)}>Instructors</li></a>
          <a href='#Schedule'>   <li onClick={()=>setShowMenu(false)}>Schedule</li></a>
          <a href='#FAQ'>  <li onClick={()=>setShowMenu(false)}>F.A.Q.</li></a>
          <a href='#Contact'> <li onClick={()=>setShowMenu(false)}>Contact Us</li></a>
          <a className='LoginFlex'>   <li   onClick={()=>setShowMenu(false)}>  <FontAwesomeIcon icon={faUser}/> <span  className='LoginText'>Log In </span> </li></a>
            <div className='NavbarButtons'>
   
           

             
      
          
            <button className="NavbarGetStartedButton">Sign Up <br></br>  </button>
            <a href='#Pricing'> <div onClick={()=>setShowMenu(false)} className="NavbarViewPlansButton"> View Prices</div></a>
            </div>
           </ul>

       
         
        </div>
    )
}