import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../Stylesheets/StarRating.css';

const StarRating = () => {
    return (
        <div className="star-rating">
           
            <FontAwesomeIcon icon={faStar} className="star star-smallest" />
            <FontAwesomeIcon icon={faStar} className="star star-smaller" />
            <FontAwesomeIcon icon={faStar} className="star star-biggest" />
            <FontAwesomeIcon icon={faStar} className="star star-smaller" />
            <FontAwesomeIcon icon={faStar} className="star star-smallest" />
 
        </div>
    );
};

export default StarRating;