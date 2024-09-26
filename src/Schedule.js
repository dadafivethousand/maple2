import React, { useEffect, useState } from 'react';
import schedule from './ScheduleObject'; // Import the schedule
import './Stylesheets/Schedule.css';

// Config: Pixels per hour
const PIXELS_PER_HOUR = 45;

// Utility function to convert 24-hour time to AM/PM
const convertToAmPm = (time) => {
  let hours = Math.floor(time);
  let minutes = (time % 1) * 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes === 0 ? '00' : minutes} ${ampm}`;
};

// Main Schedule component
export default function Schedule() {
  const [earliestTime, setEarliestTime] = useState(24);
  const [latestTime, setLatestTime] = useState(0);

  // This useEffect will calculate the earliest and latest times when the component mounts
  useEffect(() => {
    let minStartTime = 24;
    let maxEndTime = 0;

    for (const day in schedule) {
      schedule[day].forEach((classTime) => {
        if (classTime.start < minStartTime) minStartTime = classTime.start;
        if (classTime.end > maxEndTime) maxEndTime = classTime.end;
      });
    }

    setEarliestTime(minStartTime);
    setLatestTime(maxEndTime);
  }, []);

  const totalHours = latestTime - earliestTime;

  return (<div id="Schedule" className='ScheduleContainer'>
 
    <div  className="Schedule animate">
    
      {Object.keys(schedule).map((day) => (
        <div className='Column'>
        <div className='WeekDay'> <h3>{day}</h3>  </div>
        <div key={day} id={day} className="day-column" style={{ height: `${totalHours * PIXELS_PER_HOUR}px`, position:'relative' }}>
         
          {schedule[day].map((classTime, index) => {
            const topPosition = (classTime.start - earliestTime) * PIXELS_PER_HOUR;
            const classHeight = (classTime.end - classTime.start) * PIXELS_PER_HOUR;
            
            return (
              <div
                key={index}
                className="timeslot"
                style={{ top: `${topPosition}px`, height: `${classHeight}px`, position:'absolute'}}
              >
               <p>{classTime.name}<br />
                {convertToAmPm(classTime.start)} - {convertToAmPm(classTime.end)}
                </p> 
              </div>
            );
          })}
        </div>
        </div>
      ))}
    </div>
    </div> );
}
