import React, { useEffect, useState } from 'react';
import schedule from './Objects/ScheduleObject'; // Import the schedule
import './Stylesheets/Schedule.css';
import Legend from './Components/Legend';
import ScheduleWidget from './Components/ScheduleWidget';
import KidsScheduleWidget from './Components/KidsScheduleWidget';
import bluelogo from "./Media/blue-logo.png"

// Config: Pixels per hour
const PIXELS_PER_HOUR = 47;

// Utility function to convert 24-hour time to AM/PM
const dontConvertToAmPm = (time) => {
  let hours = Math.floor(time);
  let minutes = Math.round((time % 1) * 60); // Round minutes to the nearest whole number
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}${minutes === 0 ? '' : ':' + minutes}`;
};

const convertToAmPm = (time) => {
  let hours = Math.floor(time);
  let minutes = Math.round((time % 1) * 60); // Round minutes to the nearest whole number
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}${minutes === 0 ? '' : ':' + String(minutes).padStart(2, '0')}${ampm}`;
};

// Time blocks to remove (example: between 9-11 AM and 1:30-3:30 PM)
const timeBlocksToRemove = [
  { start: 8.5, end: 10.5 },
  { start: 15, end: 16.75 }
];

// NEW: tiny palette + detector (background only + inset bar; no layout impact)
const PALETTE = {
  nogi:      { bg: '#9EC5FF' }, // cornflower blue
  gi:        { bg: '#AEE6B1' }, // mint green
  muay:      { bg: 'rgba(255, 255, 255, 1)' }, // apricot
  wrestling: { bg: '#D3B3FF' }, // lavender
  mma:       { bg: '#FF9AA8' }, // coral pink
  kids:      { bg: '#FFE38A' }, // sunny yellow
  openmat:   { bg: '#6fdee2ff' }, // periwinkle
 };





const paintFor = (name = '') => {
  if (/open\s*mat/i.test(name)) return PALETTE.openmat;
  if (/no[ -]?gi|nogi/i.test(name)) return PALETTE.nogi;
  if (/\bgi\b|bjj/i.test(name)) return PALETTE.gi;
  if (/muay|thai|striking/i.test(name)) return PALETTE.muay;
  if (/wrestling|freestyle|folkstyle|greco/i.test(name)) return PALETTE.wrestling;
  if (/\bmma\b/i.test(name)) return PALETTE.mma;
  if (/\bkids?\b|youth|junior|teen/i.test(name)) return PALETTE.kids;
  if (/fundamentals?|basics?|intro/i.test(name)) return PALETTE.fundamentals;
  return PALETTE.default;
};

// Main Schedule component
export default function Schedule() {
  const [earliestTime, setEarliestTime] = useState(24);
  const [latestTime, setLatestTime] = useState(0);
  const [totalRemovedHeight, setTotalRemovedHeight] = useState(0);

  // This useEffect will calculate the earliest and latest times when the component mounts
  useEffect(() => {
    let minStartTime = 24;
    let maxEndTime = 0;
    let removedHeight = 0;

    // Calculate the minimum start time and maximum end time across all days
    for (const day in schedule) {
      schedule[day].forEach((classTime) => {
        if (classTime.start < minStartTime) minStartTime = classTime.start;
        if (classTime.end > maxEndTime) maxEndTime = classTime.end;
      });
    }

    // Calculate the total height to remove based on time blocks
    timeBlocksToRemove.forEach((block) => {
      removedHeight += (block.end - block.start) * PIXELS_PER_HOUR;
    });

    setEarliestTime(minStartTime);
    setLatestTime(maxEndTime);
    setTotalRemovedHeight(removedHeight);
  }, []);

  // Calculate adjusted position of a class considering the removed time blocks
  const adjustPosition = (startTime) => {
    let adjustedTop = (startTime - earliestTime) * PIXELS_PER_HOUR;

    // Iterate through time blocks and adjust top position if class falls after the block
    timeBlocksToRemove.forEach((block) => {
      if (startTime >= block.end) {
        adjustedTop -= (block.end - block.start) * PIXELS_PER_HOUR;
      } else if (startTime >= block.start && startTime < block.end) {
        adjustedTop -= (startTime - block.start) * PIXELS_PER_HOUR;
      }
    });

    return adjustedTop;
  };

  const totalHours = latestTime - earliestTime;

  return (
    <div id="Schedule" className='ScheduleContainer'>
 <h1 className='animate'> 🗓️ Schedule</h1>
    <ScheduleWidget />  
      <div className="Schedule">
        {Object.keys(schedule).map((day) => (
          <div className='Column animate' key={day}>
            <div className='WeekDay'>
              <h3 className="full-day-name">{day}</h3>
              <h3 className="short-day-name">{day.substring(0, 3)}</h3>
            </div>
            <div
              id={day}
              className={`day-column ${day}`}
              style={{
                height: `${totalHours * PIXELS_PER_HOUR - totalRemovedHeight}px`,
                position: 'relative'
              }}
            >
              {schedule[day].map((classTime, index) => {
                const topPosition = adjustPosition(classTime.start);
                const classHeight = (classTime.end - classTime.start) * PIXELS_PER_HOUR;

                // NEW: compute colors per class name
                const { bg, bar } = paintFor(classTime.name);

                return (
                  <div
                    key={index}
                    className="timeslot"
                    style={{
                      top: `${topPosition}px`,
                      height: `${classHeight}px`,
                      position: 'absolute',        // unchanged
                      backgroundColor: bg,         // NEW: background only
                     }}
                  >
                    <p className='class-name'>{classTime.name} </p>
                    <p>
                      <span className='class-time'>
                        {convertToAmPm(classTime.start)} - {convertToAmPm(classTime.end)}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {/*
        < KidsScheduleWidget />
          */}
      </div>
      <div></div>
    </div>
  );
}
