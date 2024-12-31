// Pricing.js
import './Stylesheets/Pricing.css';
import React from 'react';
import Memberships from './Objects/MembershipsObject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUserPlus, faUserCog } from '@fortawesome/free-solid-svg-icons';
import MembershipComponent from './Components/MembershipComponent';
import { useState, useEffect, useRef } from 'react';
import SetmoreBookingPage from './Components/SetmoreWidget';
import { useAppContext } from './AppContext';

const Bullets = [
    {
        symbol: <FontAwesomeIcon className='icon' icon={faUserPlus} />,
        header: 'Seamless Onboarding',
        description: 'Join online without any sales pressure—you’re in control!'
    },
    {
        symbol: <FontAwesomeIcon className='icon' icon={faDollarSign} />,
        header: 'Transparent Pricing',
        description: 'Everything upfront, no surprises or hidden costs.'
    },
    {
        symbol: <FontAwesomeIcon className='icon' icon={faUserCog} />,
        header: 'Membership Management',
        description: 'Handle everything online, including cancellations.'
    },
];

export default function Pricing() {
    const {
        showAdult,
        setShowAdult,
        showKid,
        setShowKid,
        showPrivate,
        setShowPrivate,
      } = useAppContext();
    const itemRefs = useRef([]);
    const [show, setShow] = useState(new Array(Bullets.length).fill(false));

    const toggleAdult = () => setShowAdult(prev => !prev);
    const toggleKid = () => setShowKid(prev => !prev);
    const togglePrivate = () => setShowPrivate(prev => !prev);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const itemIndex = itemRefs.current.findIndex(ref => ref === entry.target);
                    if (itemIndex === -1) return; // Safety check

                    if (entry.isIntersecting) {
                        setShow(prev => {
                            const newShow = [...prev];
                            newShow[itemIndex] = true;
                            return newShow;
                        });
                    } else {
                        setShow(prev => {
                            const newShow = [...prev];
                            newShow[itemIndex] = false;
                            return newShow;
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        // Observe each bullet point
        itemRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        // Cleanup on unmount
        return () => {
            if (observer) observer.disconnect();
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div id="pricing" className='PricingContainer'>
             <h1 className="animate">Pricing</h1> 
          {/*      <MembershipComponent type={Memberships.adult} />  */}
  <div className='pricing-flex'>
   
             <div className='PricingButtonContainer'>
                <button onClick={toggleAdult} className='AdultMembershipButton'>Adults & Teens</button>
            </div>
            {showAdult && <MembershipComponent type={Memberships.adult} />}
             <div className='PricingButtonContainer'>
                <button onClick={toggleKid} className='KidsMembershipButton'>Kids (8-12)</button>
            </div>
            {showKid && <MembershipComponent type={Memberships.kids} />}
        
   
                <div className='PricingButtonContainer'>
                <button  onClick={togglePrivate}  className='KidsMembershipButton'>Private & Group Training</button>
                <div className='booking-page'>
                {showPrivate &&  <MembershipComponent type={Memberships.private}/>}
                </div>
            </div>
      
      
            </div>
            <ul className='BulletPoints'>
                {Bullets.map((bullet, index) => (
                    <li
                        ref={el => itemRefs.current[index] = el}
                        key={index}
                        className='bullet-item'
                    >
                        <div className={`${show[index] ? 'Show' : ''} Vertical`}>
                            {bullet.symbol}
                            <div className='center'>
                                <div className='BulletHeader'>{bullet.header}</div>
                                <div className='Description'>{bullet.description}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
   



     
      
        </div>
    );
}
