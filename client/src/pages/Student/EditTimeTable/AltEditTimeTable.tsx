import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import "./../SlotReserve/SlotReservePage.css"; 

const EditTimetable: React.FC = () => {
  const timeSlots = [
    "7:30am - 8:00am", "8:00am - 8:30am", "8:30am - 9:00am", "9:00am - 9:30am",
    "9:30am - 10:00am", "10:00am - 10:30am", "10:30am - 11:00am", "11:00am - 11:30am",
    "11:30am - 12:00pm", "12:00pm - 12:30pm", "12:30pm - 1:00pm", "1:00pm - 1:30pm",
    "1:30pm - 2:00pm", "2:00pm - 2:30pm", "2:30pm - 3:00pm", "3:00pm - 3:30pm",
    "3:30pm - 4:00pm", "4:00pm - 4:30pm", "4:30pm - 5:00pm"
  ];

  const navigate = useNavigate();
  const location = useLocation();
  
  const { targetReservation, newLaboratory, newSlot } = location.state || {};

  const [scheduleDays, setScheduleDays] = useState<{dayName: string, dateString: string}[]>([]);
  const [reservedCells, setReservedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!targetReservation) navigate('/edit');
  }, [targetReservation, navigate]);

  useEffect(() => {
    const daysArray = [];
    let daysOffset = 0;
    while (daysArray.length < 7) {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      daysOffset++;
      if (d.getDay() === 0) continue; 

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
            if (reservation._id === targetReservation?.id) return;

            if (reservation.laboratory?.name === newLaboratory) {
              reservation.reservedSlots.forEach((rs: any) => {
                if (rs.slot?.name === newSlot) {
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
    if (newLaboratory && newSlot) fetchReservations();
  }, [newLaboratory, newSlot, targetReservation]);

  const getCellStatus = (dateString: string, time: string) => {
    return reservedCells.has(`${dateString}_${time}`) ? "status-reserved" : "status-available";
  };

  const handleUpdateReservation = async (dateString: string, timeString: string) => {
    if (getCellStatus(dateString, timeString) === "status-reserved") {
      alert("This slot is currently occupied by someone else!");
      return;
    }

    const confirmBooking = window.confirm(
      `Update your reservation to ${newSlot} in ${newLaboratory} on ${dateString} at ${timeString}?`
    );
    if (!confirmBooking) return;

    const [startStr, endStr] = timeString.split(' - ');
    const convertToUTC = (dateStr: string, timeStr: string) => {
      let [hours, minAmPm] = timeStr.split(':');
      let minutes = minAmPm.substring(0, 2);
      let modifier = minAmPm.substring(2); 
      let hoursInt = parseInt(hours, 10);
      if (modifier === 'pm' && hoursInt < 12) hoursInt += 12;
      if (modifier === 'am' && hoursInt === 12) hoursInt = 0;
      return new Date(`${dateStr}T${hoursInt.toString().padStart(2, '0')}:${minutes}:00.000Z`);
    };

    try {
      const response = await fetch(`http://localhost:3000/reservations/${targetReservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          laboratory: newLaboratory,
          reservedSlots: [
            {
              slot: newSlot,
              timeStart: convertToUTC(dateString, startStr).toISOString(),
              timeEnd: convertToUTC(dateString, endStr).toISOString()
            }
          ]
        })
      });

      if (response.ok) {
        alert("🎉 Reservation successfully updated!");
        navigate('/edit');
      } else {
        const errorData = await response.json();
        alert(`Failed to update: ${errorData.error || errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  };

  if (!targetReservation) return null;

  return (
    <div className="pageContainer">
      <Board title="Reschedule Reservation" room={newLaboratory} slot={`Slot ${newSlot}`}>

        <div className="howToBox" style={{ 
          marginBottom: '20px', 
          backgroundColor: 'rgba(255, 255, 255, 0.15)', 
          backdropFilter: 'blur(8px)', 
          padding: '18px 24px', 
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#ffffff', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f6d365', marginTop: 0, marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>
            Modifying Schedule
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '1rem' }}>
            <p style={{ margin: 0 }}><strong>Previous Lab & Seat:</strong> {targetReservation.laboratory} - {targetReservation.slot}</p>
            <p style={{ margin: 0 }}><strong>Previous Time:</strong> {targetReservation.date} | {targetReservation.timeStart} - {targetReservation.timeEnd}</p>
          </div>
        </div>

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
                  {timeSlots.map(timeSlot => {
                    const status = getCellStatus(dayObj.dateString, timeSlot);
                    return (
                      <td 
                        key={`${dayObj.dateString}_${timeSlot}`}
                        className={`timeCell ${status}`}
                        style={{ cursor: status === 'status-available' ? 'pointer' : 'not-allowed' }}
                        onClick={() => handleUpdateReservation(dayObj.dateString, timeSlot)}
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="topControls" style={{ marginTop: '20px' }}>
          <button 
            className="backToSelectionBtn" 
            onClick={() => navigate('/edit-board', { state: { targetReservation } })}
          >
            ← Back to Seat Selection
          </button>
        </div>
      </Board>
    </div>
  );
};

export default EditTimetable;