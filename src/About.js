import './Stylesheets/About.css';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';


 

export default function About() {
    const items = [
        { icon: "fas fa-map-marker-alt", text: "First Brazilian Jiujitsu Academy in Maple" },
        { icon: "fas fa-shield-alt", text: "Safe and healthy training atmosphere" },
        { icon: "fas fa-book-open", text: "Structured and comprehensive curriculum" },
        { icon: "fas fa-users", text: "Committed to fostering an inclusive environment" },
        { icon: "fas fa-building", text: "Conveniently located premium facility" },
        { icon: "fas fa-trophy", text: "Top level professional instruction" }
    ];

    const itemRefs = useRef(new Array(items.length).fill(null));
    const [isVisible, setIsVisible] = useState(new Array(items.length).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const itemIndex = itemRefs.current.findIndex(ref => ref === entry.target);
                    if (entry.isIntersecting) {
                        // Set the item to visible when it becomes visible
                        setIsVisible(prev => prev.map((visible, idx) => idx === itemIndex ? true : visible));
                    } else {
                        // Reset the item to hidden when it goes out of view
                        setIsVisible(prev => prev.map((visible, idx) => idx === itemIndex ? false : visible));
                    }
                });
            },
            { threshold: 0.5 } // Adjust the threshold as needed
        );

        itemRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            observer.disconnect(); // Cleanup
        };
    }, [itemRefs]);

    return (
        <div id='About' className='AboutContainer'>
    

            <h1 className="animate"> <span className='White'> About </span> <span className='Crimson'> Maple Jiu-Jitsu </span></h1>
            <p className="animate"> At Maple Jiu-Jitsu Academy, we are committed to delivering a top-tier training experience for all skill levels. 
                Our passion for Brazilian Jiu-Jitsu goes beyond just techniques; it’s about building a strong, inclusive community where everyone can grow, learn, and thrive.</p>
            
            <div className='AboutTextAndVideo'>
                <ul>
                    {items.slice(0, 3).map((item, index) => (
                        <li ref={el => itemRefs.current[index] = el} key={index} className={`${isVisible[index] ? 'visible' : ''} Left`}>
                            <div className='IconWrapper'>
                                <i className={item.icon}></i>
                            </div>
                            {item.text}
                        </li>
                    ))}
                </ul>
                <ul>
                    {items.slice(3).map((item, index) => (
                        <li ref={el => itemRefs.current[index + 3] = el} key={index + 3} className={`${isVisible[index + 3] ? 'visible' : ''} Right`} >
                            <div className='IconWrapper'>
                                <i className={item.icon}></i>
                            </div>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="second">
            <p   className="animate"> Whether you're looking to compete, get in shape, or learn self-defense, Maple Jiu-Jitsu Academy is the place to start your journey. Join us today and become part of our family!</p>
            </div>
        </div>
    );
}