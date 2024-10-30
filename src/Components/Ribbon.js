import React from 'react';
import '../Stylesheets/Ribbon.css';

export default function TopRibbon({ topText, bottomText }) {
    return (
        <div className="top-ribbon">
            <div className="ribbon-top">{topText}</div>
    
        </div>
    );
};



 