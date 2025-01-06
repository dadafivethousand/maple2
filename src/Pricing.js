// Pricing.js
import './Stylesheets/Pricing.css';
import React from 'react';
import Memberships from './Objects/MembershipsObject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUserPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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
        symbol: <FontAwesomeIcon className='icon' icon={faCalendarAlt} />,
        header: 'Flexible Scheduling',
        description: 'Train at times that fit your busy lifestyle'
    },
];

export default function Pricing() {
    const {
        setShowPizduq,
        showPizduq,
        showAdult,
        setShowAdult,
        showKid,
        setShowKid,
        showPrivate,
        setShowPrivate,
      } = useAppContext();
    const itemRefs = useRef([]);
    const [show, setShow] = useState(new Array(Bullets.length).fill(false));
    const [priceObject, setPriceObject] = useState(null)

    const toggleAdult = () => setShowAdult(prev => !prev);
    const toggleKid = () => setShowKid(prev => !prev);
    const togglePizduq = () => setShowPizduq(prev => !prev);
    const togglePrivate = () => setShowPrivate(prev => !prev);

    useEffect(()=>{
        console.log('fetchinginfo')
        async function fetchMembershipInfo(){
        try {
            const response = await fetch('https://worker-consolidated.maxli5004.workers.dev/membership-info');
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setPriceObject(data);
            } else {
                console.error('Failed to fetch membership info');
            }

        } catch (error) {
            console.error('Error fetching Membership Info:', error)
        }
    }
    fetchMembershipInfo();

}, 
[]);


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
            {showAdult && priceObject?.adult && <MembershipComponent type={priceObject.adult} />}
             <div className='PricingButtonContainer'>
                <button onClick={toggleKid} className='KidsMembershipButton'>Kids (8-12)</button>
            </div>
            {showKid && priceObject?.kids && <MembershipComponent type={priceObject.kids} />}


            <div className='PricingButtonContainer'>
                <button  onClick={togglePizduq}  className='KidsMembershipButton'>Kids (4-7)</button>
                </div>
            
                {showPizduq && priceObject?.privates &&  <MembershipComponent type={priceObject.pizduqi}/>}
              
            

                <div className='PricingButtonContainer'>
                <button  onClick={togglePrivate}  className='KidsMembershipButton'>Private Training</button>
                </div>
            
                {showPrivate && priceObject?.privates &&  <MembershipComponent type={priceObject.privates}/>}
              
            

       
      
      
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
