import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import "./SlotReservePage.css";

// NEW: Added an interface so the parent component can pass an 'onSelectionSubmit' function
interface SelectedSlotData {
  slot: string;
  date: string;
  timeStart: string;
  timeEnd: string;
}

interface SlotAvailabilityProps {
  laboratoryProp?: string;
  slotProp?: string;
  onSelectionSubmit?: (selectedSlots: SelectedSlotData[]) => void;
}

const SlotAvailability: React.FC<SlotAvailabilityProps> = ({ laboratoryProp, slotProp, onSelectionSubmit }) => {
  const timeSlots = [
    "7:30am - 8:00am", "8:00am - 8:30am", "8:30am - 9:00am", "9:00am - 9:30am",
    "9:30am - 10:00am", "10:00am - 10:30am", "10:30am - 11:00am", "11:00am - 11:30am",
    "11:30am - 12:00pm", "12:00pm - 12:30pm", "12:30pm - 1:00pm", "1:00pm - 1:30pm",
    "1:30pm - 2:00pm", "2:00pm - 2:30pm", "2:30pm - 3:00pm", "3:00pm - 3:30pm",
    "3:30pm - 4:00pm", "4:00pm - 4:30pm", "4:30pm - 5:00pm"
  ];

  const navigate = useNavigate();
  const location = useLocation();
  
  const laboratory = laboratoryProp || location.state?.laboratory || "Select a Lab";
  const slot = slotProp || location.state?.slot || "None";

  const masterSlots: SelectedSlotData[] = location.state?.selectedSlots || [];

  const otherDesksSlots = masterSlots.filter(item => item.slot !== slot);
  const currentDeskSlots = masterSlots.filter(item => item.slot === slot);

  const initialSelectedSet = new Set<string>(
    currentDeskSlots.map(item => `${item.date}_${item.timeStart} - ${item.timeEnd}`)
  );

  const [scheduleDays, setScheduleDays] = useState<{dayName: string, dateString: string}[]>([]);
  const [reservedCells, setReservedCells] = useState<Set<string>>(new Set());
  
  const [selectedCells, setSelectedCells] = useState<Set<string>>(initialSelectedSet);
  
  const [currentTime, setCurrentTime] = useState(new Date())

  const formatTime = (isoStr: string) => {
    const timePart = isoStr.split('T')[1];
    let hour = parseInt(timePart.substring(0, 2), 10);
    const minute = timePart.substring(3, 5);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour}:${minute}${ampm}`;
  };

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const daysArray = [];
    let daysOffset = 0;

    if (currentTime.getHours() * 60 + currentTime.getMinutes() >= 990) {
      daysOffset++;
    }

    while (daysArray.length < 7) {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      daysOffset++;

      if (d.getDay() === 0) continue; 

      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      daysArray.push({ dayName, dateString: formatDate(d) });
    }
    setScheduleDays(daysArray);
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('/reservations/active');
        if (res.ok) {
          const data = await res.json();
          const taken = new Set<string>();

          const formatDBTimeToGridTime = (isoStart: string, isoEnd: string) => {
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
    const cellKey = `${dateString}_${time}`;
    const startTime = time.split(" - ")[0].replace("am", ":AM").replace("pm", ":PM").split(":");
    const hours = Number(startTime[0]) + ((startTime.includes("PM") && Number(startTime[0]) < 12) ? 12 : 0);
    const minutes = Number(startTime[1])

    if (formatDate(currentTime) === dateString && (currentTime.getHours() * 60 + currentTime.getMinutes() >= hours * 60 + minutes)) {
      return "status-unavailable";
    }
    if (reservedCells.has(cellKey)) return "status-reserved";
    if (selectedCells.has(cellKey)) return "status-selected"; // NEW: check if user selected it
    
    return "status-available";
  };

  const handleToggleSelection = (dateString: string, timeString: string) => {
    const status = getCellStatus(dateString, timeString);
    
    if (status === "status-reserved") {
      alert("This slot is already reserved!");
      return;
    }
    if (status === "status-unavailable") {
      alert("This slot is unavailable.");
      return;
    }

    const cellKey = `${dateString}_${timeString}`;
    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cellKey)) {
        newSet.delete(cellKey); 
      } else {
        newSet.add(cellKey); 
      }
      return newSet;
    });
  };

  const handleBacktoSeatSelection = () => {
    if (onSelectionSubmit) {
      onSelectionSubmit(masterSlots);
    } else {
      navigate('/create', { state: { selectedSlots: masterSlots, laboratory: laboratory } });
    }
  }

  // LIFTS STATE
  const handleConfirmSelection = () => {
    const newCurrentDeskSlots = Array.from(selectedCells).map(cellKey => {
      const [date, timeRange] = cellKey.split('_');
      const [timeStart, timeEnd] = timeRange.split(' - ');
      return { 
        slot: slot,
        date, 
        timeStart, 
        timeEnd 
      };
    });

    const updatedMasterSlots = [...otherDesksSlots, ...newCurrentDeskSlots];

    if (onSelectionSubmit) {
      onSelectionSubmit(updatedMasterSlots);
    } else {
      navigate('/create', { state: { selectedSlots: updatedMasterSlots, laboratory: laboratory } });
    }
  };

  return (
    <div className="pageContainer">
      <Board title="Select Timeslots" room={laboratory} slot={`Slot ${slot}`}>
        
        <div className="topControls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <button 
            className="backToSelectionBtn" // just using the style of the back button; not sure where it is
            onClick={handleBacktoSeatSelection}
          >
            ← Back to Seat Selection
          </button>

          <button 
            className="confirmSelectionBtn"
            onClick={handleConfirmSelection}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#d1dfcd',
              color: "#2e7d32",
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Confirm Selected Slots ({selectedCells.size})
          </button>
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
                    <div style={{ fontSize: '1.3em', color: '#2d5a27'}}>{dayObj.dayName}</div>
                    <div style={{ fontSize: '0.9em', color: '#666' }}>{dayObj.dateString}</div>
                  </td>
                  {timeSlots.map(timeSlot => {
                    const status = getCellStatus(dayObj.dateString, timeSlot);
                    return (
                      <td 
                        key={`${dayObj.dateString}_${timeSlot}`}
                        className={`timeCell ${status}`}
                        style={{ cursor: status === 'status-unavailable' || status === 'status-reserved' ? 'not-allowed' : 'pointer' }}
                        onClick={() => handleToggleSelection(dayObj.dateString, timeSlot)}
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Board>
    </div>
  );
};

export default SlotAvailability;