import React from 'react';
import cancellations from '../Objects/ClassCancellations'; // Assuming the cancellations file is exported as shown
import '../Stylesheets/ScheduleWidget.css'; // Import the CSS file

const ScheduleWidget = () => {
  // Group cancellations by date
  const groupedCancellations = cancellations.reduce((acc, cancellation) => {
    const { day } = cancellation;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(cancellation);
    return acc;
  }, {});

  return (
    <div className="schedule-widget">
      <h4> Class Cancellations <br></br> Jan 22 - Jan 24</h4>
      <table className="schedule-table">
 
        <tbody>
          {Object.keys(groupedCancellations).map((day) => (
            <React.Fragment key={day}>
              <tr className="schedule-date-row">
                <td colSpan="4" className="schedule-date">{day}</td>
              </tr>
              {groupedCancellations[day].map(({ name, time }, index) => (
                <tr key={index} className="schedule-row">
                  <td></td>
                  <td>{name}</td>
                  <td>{time}</td>
            
               
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
     </div>
  );
};

export default ScheduleWidget;
