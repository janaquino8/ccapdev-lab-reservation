import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import "./SlotReservePage.css";

const SlotAvailability: React.FC = () => {
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

  const [scheduleDays, setScheduleDays] = useState<{dayName: string, dateString: string}[]>([]);
  const [reservedCells, setReservedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    const daysArray = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      
      daysArray.push({ dayName, dateString: `${year}-${month}-${day}` });
    }
    setScheduleDays(daysArray);
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:3000/reservations');
        if (res.ok) {
          const data = await res.json();
          const taken = new Set<string>();

          const formatDBTimeToGridTime = (isoStart: string, isoEnd: string) => {
            const formatTime = (isoStr: string) => {
              const timePart = isoStr.split('T')[1];
              let hour = parseInt(timePart.substring(0, 2), 10);
              const minute = timePart.substring(3, 5);
              const ampm = hour >= 12 ? 'pm' : 'am';
              hour = hour % 12 || 12;
              return `${hour}:${minute}${ampm}`;
            };
            return `${formatTime(isoStart)} - ${formatTime(isoEnd)}`;
          };

          data.forEach((reservation: any) => {
            if (reservation.laboratory?.name === laboratory) {
              reservation.reservedSlots.forEach((rs: any) => {
                if (rs.slot?.name === slot) {
                  const dateString = rs.timeStart.split('T')[0];
                  const gridTime = formatDBTimeToGridTime(rs.timeStart, rs.timeEnd);

                  taken.add(`${dateString}_${gridTime}`);
                }
              });
            }
          });

          setReservedCells(taken);
        }
      } catch (err) {
        console.error("Failed to fetch reservations", err);
      }
    };

    if (laboratory !== "Select a Lab" && slot !== "None") {
      fetchReservations();
    }
  }, [laboratory, slot]);
  
  const getCellStatus = (dateString: string, time: string) => {
    return reservedCells.has(`${dateString}_${time}`) ? "status-reserved" : "status-available";
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
              {scheduleDays.map(dayObj => (
                <tr key={dayObj.dateString}>
                  <td className="sticky-col dayLabel">
                    <div style={{ color: '#000'}}>{dayObj.dayName}</div>
                    <div style={{ fontSize: '0.8em', color: '#666' }}>{dayObj.dateString}</div>
                  </td>
                  {timeSlots.map(timeSlot => (
                    <td 
                      key={`${dayObj.dateString}_${timeSlot}`}
                      className={`timeCell ${getCellStatus(dayObj.dateString, timeSlot)}`}
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