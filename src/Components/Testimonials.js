import React, { useState, useEffect, useRef } from 'react';
import '../Stylesheets/Testimonials.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import google from '../Media/g.png'
 
import StarRating from './Stars';
 

export default function Testimonials() {
    const [reviewIndex, setReviewIndex] = useState(0);
    const [nextReviewIndex, setNextReviewIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [slideDirection, setSlideDirection] = useState(''); // 'left' or 'right'
    const itemRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const reviews = [
        { text: "Best place for Brazilian Jiu Jitsu in Maple", author: "Taj Gordon"},
        { text: "Top instruction from one of the best competitive BJJ athletes in Canada.", author: "Robert Rende"},
        { text: "Best place for training, Very friendly and highly professional. I recommend", author: "Iryna Kap" },
        { text: "Amazing coaches and environment. Highly recommend!", author: "Amr Ghoneim" },
        { text: "Highly recommend this gym. Great teachers, safe environment and great location.", author: "Jessica Chab" },
        { text: "Great place, very experienced and knowledgble staff, friendly + respectful", author: "Florian P" },
        { text: "Good vibes and friendly atmosphere.", author: "Sukh Brar"},
        { text: "Amazing jiu jitsu academy!! Really professional coaches, friendly atmosphere and nice space. Highly recommend", author: "Annabelle Caruana"},

        { text: "The instructors here at Maple Jiu-Jitsu present a wealth of knowledge, experience, and passion for anyone looking to learn, train, and pursue Jiu-Jitsu.", author: "Abdula Teymouri"},
        

        
        // ... more reviews
    ];
   
    useEffect(() => {
        if (isVisible) {
            const timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
    
            // Clear the timeout if the component unmounts or `isVisible` changes
            return () => clearTimeout(timeoutId);
        }
    }, [isVisible]);
    


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]; // Since we are observing only one item
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Unobserve after it becomes visible
                }
            },
            { threshold: 0.2 }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current); // Observe the single item
        }

        return () => {
            if (itemRef.current) {
                observer.disconnect(); // Cleanup observer
            }
        };
    }, [itemRef]);

    const moveRight = () => {
        if (!isSliding) {
            setNextReviewIndex((reviewIndex + 1) % reviews.length);
            setSlideDirection('right');
            setIsSliding(true);
        }
    };

    const moveLeft = () => {
        if (!isSliding) {
            setNextReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length);
            setSlideDirection('left');
            setIsSliding(true);
        }
    };

    const handleTransitionEnd = () => {
        console.log('fuckyou')
        setReviewIndex(nextReviewIndex);
        setSlideDirection('');
        setIsSliding(false);
    };

    useEffect(()=>{
    setTimeout(() => {
        if (slideDirection ){setSlideDirection('e')}
    }, 100);  


    },[slideDirection])

    return (
        <div className="ReviewsOuterContainer" id='Testimonials'>
            <div className='ReviewTitle'>
         
    
            </div>

            <div className="ReviewsContainer">
                <div className="ButtonContainer">
                    <button onClick={moveLeft}>&lt;</button>
                </div>
                <div className="ReviewWrapper">

                   {  slideDirection? null: <div
                        className={`Review-Text ${slideDirection ? 'slide-out-' + slideDirection : ''}`}
                       
                    >
                        <p className="txt">{reviews[reviewIndex].text}</p>
                        <div className="Rating">
                            <StarRating />
                        </div>
                        <div className='flex'>
                       <p className="ReviewAuthor">{reviews[reviewIndex].author}</p>
                        </div>
                    </div>}
               { slideDirection?   <div  onTransitionEnd={handleTransitionEnd}
                        className={`Review-Text next ${'slide-in-from-' + slideDirection}`}
                    >
                        <p className="txt">{reviews[nextReviewIndex].text}</p>
                        <div className="Rating">
                            <StarRating />
                        </div>
                        <div className='flex'>
                   
                        <p className="ReviewAuthor">{reviews[nextReviewIndex].author}</p>
                        </div>
                    </div> : null}
                </div> 
                <div className="ButtonContainer">
                    <button onClick={moveRight}>&gt;</button>
           
                </div>
            </div>
    
            
        </div>
    );
}