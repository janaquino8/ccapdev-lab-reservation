import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const getCellStatus = (day: string, time: string) => {
    if (day === "Monday" && time === "7:30am - 8:00am") return "status-unavailable";
    if (day === "Tuesday" && (time === "8:00am - 8:30am" || time === "8:30am - 9:00am")) return "status-reserved";
    return "status-available";
  };

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [studentNumber, setStudentNumber] = React.useState("");

  return (
    <div className="pageContainer">
      <Board title="Create Reservation" room="Gokongwei 307A" slot="Slot A1">
        <div className="studentInfo">
          <div className="studentInfoField">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </div>

          <div className="studentInfoField">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>

          <div className="studentInfoField">
            <label htmlFor="studentNumber">Student Number</label>
            <input
              id="studentNumber"
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder="12345678"
            />
          </div>
        </div>

        <div className="timetableContainer">
          <table className="availabilityTable">
            <thead>
              <tr>
                <th className="sticky-col">Date / Time</th>
                {timeSlots.map(slot => (
                  <th key={slot}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="sticky-col dayLabel">{day}</td>
                  {timeSlots.map(slot => (
                    <td 
                      key={slot} 
                      className={`timeCell ${getCellStatus(day, slot)}`}
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
            onClick={() => navigate('/admin/create')}
          >
            ← Back to Seat Selection
          </button>
        </div>
      </Board>
    </div>
  );
};

export default SlotAvailability;