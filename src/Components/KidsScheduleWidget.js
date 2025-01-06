import React from 'react';
 import '../Stylesheets/KidsScheduleWidget.css'; // Import the CSS file

const KidsScheduleWidget = () => {
   return (
      <div className="kids-schedule-widget">
          <p className='bold'>*Kids (4-7) classes require reservation</p>
          <p>to ensure personalized attention and a safe learning environment. </p>
          <a id='booking-button' className='booking-button' href='https://maplejiujitsu.setmore.com/classes/eb24a3de-f7f8-4392-8da5-1818e902d662' target="_blank">Book Now </a>
       </div>
    );
};

export default KidsScheduleWidget;
