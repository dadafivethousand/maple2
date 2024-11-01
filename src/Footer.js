import './Stylesheets/Footer.css'
import logo from './Media/whitelogo.png'

export default function Footer(){
    return(
        <div className="FooterContainer">
           <div className='FooterFlexbox'>
            <ul>
               
            <a href='#About'> <li>   About </li></a>
            <a href='#Coaches' >   <li>  Coaches  </li></a>
            <a href='#Schedule' >  <li>  Schedule  </li></a>
            <a  href='#programs'>  <li>  Programs  </li></a>
            </ul>
            <ul>
          
            <a  href='#FAQ'>  <li>  F.A.Q.  </li></a>
            <a href='https://billing.stripe.com/p/login/7sI3fAgOUdugbvybII'> <li onClick={()=>setClick(false)}>My Account</li></a>

            <a  href='#Contact'>   <li>  Contact Us  </li></a>
           
            </ul>

            <img src={logo} />
            
            </div>
            {/*
            <hr></hr>
            <h5 className='white'>Powered by <span className='crimson'>5K Studios Inc.</span>  All Rights Reserved</h5>
            */}
        </div>
    )
}