import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import "./SlotReservePage.css";

const SlotAvailability: React.FC = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const timeSlots = [
    "7:30am - 8:00am", "8:00am - 8:30am", "8:30am - 9:00am", "9:00am - 9:30am",
    "9:30am - 10:00am", "10:00am - 10:30am", "10:30am - 11:00am", "11:00am - 11:30am",
    "11:30am - 12:00pm", "12:00pm - 12:30pm", "12:30pm - 1:00pm", "1:00pm - 1:30pm",
    "1:30pm - 2:00pm", "2:00pm - 2:30pm", "2:30pm - 3:00pm", "3:00pm - 3:30pm",
    "3:30pm - 4:00pm", "4:00pm - 4:30pm", "4:30pm - 5:00pm"
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const { laboratory, slot } = location.state || { laboratory: "Select a Lab", slot: "None" };

  const getCellStatus = (day: string, time: string) => {
    if (day === "Monday" && time === "7:30am - 8:00am") return "status-unavailable";
    if (day === "Tuesday" && (time === "8:00am - 8:30am" || time === "8:30am - 9:00am")) return "status-reserved";
    return "status-available";
  };

  return (
    <div className="pageContainer">
      <Board title="Create Reservation" room={laboratory} slot={`Slot ${slot}`}>
        <div className="timetableContainer">
          <table className="availabilityTable">
            <thead>
              <tr>
                <th className="sticky-col">Date / Time</th>
                {timeSlots.map(timeSlot => (
                  <th key={timeSlot}>{timeSlot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="sticky-col dayLabel">{day}</td>
                  {timeSlots.map(timeSlot => (
                    <td 
                      key={timeSlot} 
                      className={`timeCell ${getCellStatus(day, timeSlot)}`}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="topControls">
          <button 
            className="backToSelectionBtn" 
            onClick={() => navigate('/create')}
          >
            ← Back to Seat Selection
          </button>
        </div>
      </Board>
    </div>
  );
};

export default SlotAvailability;