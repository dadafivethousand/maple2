// Pricing.js
import './Stylesheets/Pricing.css';
import Memberships from './MembershipsObject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUserPlus, faUserCog } from '@fortawesome/free-solid-svg-icons';
import MembershipComponent from './AdultMembershipComponent';
import { useState, useEffect, useRef } from 'react';

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
        header: 'Easy Membership Management',
        description: 'Handle everything online, including cancellations.'
    },
];

export default function Pricing() {
    const [showAdult, setShowAdult] = useState(false);
    const [showKid, setShowKid] = useState(false);
    const itemRefs = useRef([]);
    const [show, setShow] = useState(new Array(Bullets.length).fill(false));

    const toggleAdult = () => setShowAdult(prev => !prev);
    const toggleKid = () => setShowKid(prev => !prev);

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
        <div id="Pricing" className='PricingContainer'>
            <h1 className="animate">Membership Plans</h1>
            <div className='PricingButtonContainer animate '>
                <button onClick={toggleAdult} className='AdultMembershipButton'>Adults & Teens</button>
            </div>
            {showAdult && <MembershipComponent type={Memberships.adult} />}
            <div className='PricingButtonContainer animate'>
                <button onClick={toggleKid} className='KidsMembershipButton'>Kids (4-13)</button>
            </div>
            {showKid && <MembershipComponent type={Memberships.kids} />}
            
            <ul className='BulletPoints'>
                {Bullets.map((bullet, index) => (
                    <li
                        ref={el => itemRefs.current[index] = el}
                        key={index}
                        className='bullet-item'
                    >
                        <div className={`${show[index] ? 'Show' : ''} Vertical`}>
                            {bullet.symbol}
                            <div className='Center'>
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
