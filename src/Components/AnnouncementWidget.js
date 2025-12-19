import React from 'react';
import cancellations from '../Objects/ClassCancellations';
import '../Stylesheets/ScheduleWidget.css';

const ScheduleWidget = () => {
  const groupedCancellations = cancellations.reduce((acc, cancellation) => {
    const { day } = cancellation;
    if (!acc[day]) acc[day] = [];
    acc[day].push(cancellation);
    return acc;
  }, {});

  return (
    <div className="announcement-widget">
      <h4> Class Cancellations <br /> Jan 22 - Jan 24</h4>
      <table className="announcement-table">
        <tbody>
          {Object.keys(groupedCancellations).map((day) => (
            <React.Fragment key={day}>
              <tr className="announcement-date-row">
                <td colSpan="4" className="announcement-date">{day}</td>
              </tr>

              {groupedCancellations[day].map(({ name, time }, index) => (
                <tr key={index} className="announcement-row">
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
