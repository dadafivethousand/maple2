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
import { useNavigate } from 'react-router-dom';
import logo from './Media/logo-image.png'

import KidsForm from './Components/KidsForm';
import Leadform from './LeadForm'
import ScheduleWidget from './Components/ScheduleWidget';
import LeadForm from './LeadForm';
import Footer from './Footer';
import Belt from './Components/Belt';
import GetStarted from './Components/GetStarted';
import Purchase from './Components/Purchase';
import TopRibbon from './Components/Ribbon';
import BottomRibbon from './Components/BottomRibbon';
 

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2, // Always show two decimal places
      maximumFractionDigits: 2,
    }).format(amount/100);
  };

const Bullets = [
        {
        symbol: <FontAwesomeIcon className='icon' icon={faDollarSign} />,
        header: 'Transparent Pricing',
        description: 'Everything upfront, no surprises or hidden costs.'
    },
    {
        symbol: <FontAwesomeIcon className='icon' icon={faUserPlus} />,
        header: 'Seamless Onboarding',
        description: 'Join online without any sales pressure—you’re in control!'
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
    const [displayArray, setDisplayArray] = useState([ ])
    const [purchasing, setPurchasing] = useState(null)
    const [purchasingHigherIndex, setPurchasingHigherIndex] = useState(null)
    const [showPaymentForm, setShowPaymentForm]=useState(false)
    const togglePaymentForm = () => {
        console.log('hi')
        setShowPaymentForm(prev => !prev);
    }

    const toggleAdult = () => setShowAdult(prev => !prev);
    const toggleKid = () => setShowKid(prev => !prev);
    const togglePizduq = () => setShowPizduq(prev => !prev);
    const togglePrivate = () => setShowPrivate(prev => !prev);
    const display = (index) => {
        setDisplayArray((prevArray) => {
            if (prevArray.includes(index)) {
                // Remove the index if it is already in the array
                return prevArray.filter(item => item !== index);
            } else {
                // Add the index if it is not in the array
                return [...prevArray, index];
            }
        });
    };

    const handlePurchasing = (higherIndex, index) => {
        setPurchasingHigherIndex(higherIndex)
        setPurchasing(index)
    }

    const cancelPurchase = () => {
        setPurchasingHigherIndex(null)
        setPurchasing(null)
    }
    
    
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
        <div id="Pricing" className='PricingContainer'>
             
      

             <h1 className="animate">Pricing</h1> 
            
    
           
{priceObject?.map((item, index) => {
    return (
        <div key={index} className='PricingButtonContainer'>

            <button onClick={() => display(index)} className='AdultMembershipButton'>{item.label}</button>
            {item.info && item.info.map((option, optionIndex) => {
                return (
               
                    displayArray.includes(index) && ( // Check if the index is in displayArray
                        <div>
                            { option.promo ? <TopRibbon topText={'PROMOTIONAL OFFER'} />: null}
                        <div key={optionIndex} className={`pricing-flex ${purchasing===optionIndex && purchasingHigherIndex===index ? 'big':'' } ${option.promo ? 'promotion': ''}`}>
                                         
                                          {purchasing===optionIndex && purchasingHigherIndex===index ? <Purchase formatCurrency={formatCurrency} option={option} cancelPurchase={cancelPurchase} optionIndex={optionIndex} purchasingHigherIndex={purchasingHigherIndex}/>:
                                          <>
                             <div className='name-and-price'>
                        
                            <p className='name-of-class'>{option.description}</p>
                            <p className='price'>{formatCurrency(option.price)} <span className='hst'>+ HST</span></p>
                            <p className='option-type'>  {option.subscription ? 'per month': 'installment options available'} </p>
                     {/*          {option.cancel ? <p className='cancel-disclaimer'>  Cancel Any Time </p> : null}  */}
                             </div>
              
                          {option.paymentLink ? (
                    <a href={option.paymentLink} id="purchase-button" target="_blank" rel="noopener noreferrer">
                        Get Started
                    </a>
                ) : ( 
                    <button onClick={() => handlePurchasing(index, optionIndex)} id='purchase-button'>
                        Get Started
                    </button>
                   )}                           </>
                        }
                       </div>
                       { option.promo ? <BottomRibbon topText={'10 SPOTS REMAINING'} />: null}

                       </div>
                    )
                );
            })}

        </div>
    );
})}


          {/*      <MembershipComponent type={Memberships.adult} />  */}

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