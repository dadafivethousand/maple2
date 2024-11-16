import { useState, useEffect } from "react"
import './Stylesheets/Navbar.css'
import logo from './Media/image.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import GetStarted from "./Components/GetStarted";

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

     
    const handleClick=()=>{
        setClick((prev)=>!prev)
    }

 

    return(
        <div className="navbar-outer-container">
             <div className="hamburger" onClick={handleClick}> {click ?  <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}  </div>
        <div className="navbar-container">
           <div className="navbar-image-conatiner">
            <img src={logo} />
            </div>
            <div className={`navbar ${click? 'slide': ''}`}>
                <div   className={`${showGetStarted?'show-get-started': ''} getstarted`}>
             <GetStarted />
             </div>
            <ul className="navbar-options">
              <a href='#About'>  <li onClick={()=>setClick(false)}>About Us</li></a>
              <a href='#programs'>  <li onClick={()=>setClick(false)}>Programs</li></a>
             
              <a href='#Coaches'>  <li onClick={()=>setClick(false)}>Coaches</li></a>
              <a  href='#Schedule'>  <li onClick={()=>setClick(false)}>Schedule</li></a>
              <a href='#pricing'>  <li onClick={()=>setClick(false)}>Pricing</li></a>
              <a href='#FAQ'>  <li onClick={()=>setClick(false)}>FAQ</li></a>
              <a href='https://billing.stripe.com/p/login/7sI3fAgOUdugbvybII'> <li onClick={()=>setClick(false)}>Members</li></a>
              <a href='#Contact'> <li onClick={()=>setClick(false)}>Contact Us</li></a>
             
            </ul>
            </div>
            </div>

        </div>
    )
}