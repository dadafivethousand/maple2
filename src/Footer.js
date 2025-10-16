import './Stylesheets/Footer.css'
import logo from './Media/whitelogonobg.png'

export default function Footer(){
    return(
        <div className="FooterContainer">
           <div className='FooterFlexbox'>
 
            <img src={logo} />
            
            </div>
            {/*
            <hr></hr>
            <h5 className='white'>Powered by <span className='crimson'>5K Studios Inc.</span>  All Rights Reserved</h5>
            */}
        </div>
    )
}