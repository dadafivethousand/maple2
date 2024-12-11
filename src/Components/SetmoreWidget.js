import React from 'react';

const SetmoreBookingPage = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' , border: ' 1px solid black'}}>
       <iframe
        src="https://booking.setmore.com/scheduleappointment/eb8d9f2f-81d6-45d1-aee7-4d117cc064af"
       
        width="100%"
        height="100%"
         
        title="Setmore Booking Page"
        style={{
          border: 'none',
          minHeight: '600px', // Adjust to fit your design
          display: 'block',
        }}
      ></iframe>
    </div>
  );
};

export default SetmoreBookingPage;
