import React from 'react';
import '../Stylesheets/Ribbon.css';

export default function BottomRibbon({ topText, bottomText }) {
    return (
        <div className="bottom-ribbon">
            <div className="ribbon-top">{topText}</div>
            <div className="ribbon-bottom">{bottomText}</div>
        </div>
    );
};



 