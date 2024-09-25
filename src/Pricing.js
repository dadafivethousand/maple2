import './Stylesheets/Pricing.css'
import  Memberships from './MembershipsObject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUserPlus, faUserCog } from '@fortawesome/free-solid-svg-icons';
import Membership from './Membership';
import MembershipComponent from './AdultMembershipComponent';
import { useState, useEffect } from 'react';


const Bullets =  [
    {symbol:     <FontAwesomeIcon className='icon  ' icon={faUserPlus} />, header: 'Seamless Onboarding', description: 'Join online without any sales pressure—you’re in control!' },
    {symbol:  <FontAwesomeIcon className='icon ' icon={faDollarSign} />, header: 'Transparent Pricing ', description: 'Everything upfront, no surprises or hidden costs.' },
   
    {symbol: <FontAwesomeIcon className='icon  ' icon={faUserCog} />, header: 'Easy Membership Management', description: 'Handle everything online. Pause or cancel at any time.' },
]

export default function Pricing(){
    const [showAdult, setShowAdult] = useState(false)
    const [showKid, setShowKid] = useState(false)
 

    const toggleAdult = () => setShowAdult(prev => !prev);
    const toggleKid = () => setShowKid(prev => !prev);
    return(
        <div className='PricingContainer'>
             <h1 >  View our Membership Plans </h1> 
   

 

 
 <div className='PricingButtonContainer'>
 <button onClick={toggleAdult} className='AdultMembershipButton'>Adults & Teens</button> 
 </div>
{ showAdult? < MembershipComponent type={Memberships.adult}/> :null}
<div className='PricingButtonContainer'>
  <button onClick={toggleKid} className='KidsMembershipButton'> Kids (4-13) </button>
  </div>
  {showKid?< MembershipComponent type={Memberships.kids} /> : null}

  <ul className='BulletPoints'> {
            Bullets.map((bullet, index)=>{
                return(
                    <li>
                       <div className='Vertical'>
                             {bullet.symbol}
                        <div className='Vertical Center'>
                      <div className='BulletHeader'>       {bullet.header}   </div>     
                    <div className='Description'>     {bullet.description} </div>    
                        </div>
                        </div>
                    </li>
                 
                )
            })
        }
 </ul>
  </div>
 
    )
}