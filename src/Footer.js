import './Stylesheets/Footer.css'
import logo from './Media/leaf.png'

export default function Footer(){
    return(
        <div className="FooterContainer">
           <div className='FooterFlexbox'>
            <ul>
               
            <a href='#About'> <li>About</li></a>
            <a href='#Coaches' >   <li>Instructors</li></a>
            <a href='#Schedule' >  <li>Schedule</li></a>
            </ul>
            <ul>
            <a  href='#FAQ'>  <li>F.A.Q.</li></a>
            <a  href='#Contact'>   <li>Contact Us</li></a>
            <a>   <li>Log In</li></a>
            </ul>

            <img src={logo} />
            
            </div>
            <hr></hr>
            <h5>Powered by <span className='Crimson'>5K Studios Inc.</span>  All Rights Reserved</h5>

        </div>
    )
}