import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Desk from '../../../components/Desk/Desk.tsx';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import styles from '../../../components/Board/Board.module.css';
import "./EditBoardSelection.css";

interface FinalReservedSlots {
  slot: string,
  timeStart: string,
  timeEnd: string
}

interface SelectedSlotData {
  slot: string;
  date: string;
  timeStart: string;
  timeEnd: string;
}

const EditBoardSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { originalReservation } = location.state || {};

  const sortReservations = (reservations: SelectedSlotData[]): SelectedSlotData[] => {
    return [...reservations].sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;

      const parseTime = (timeStr: string) => {
        let [hours, minAmPm] = timeStr.split(':');
        let minutes = parseInt(minAmPm.substring(0, 2), 10);
        let modifier = minAmPm.substring(2).toLowerCase();
        
        let hoursInt = parseInt(hours, 10);
        if (modifier === 'pm' && hoursInt < 12) hoursInt += 12;
        if (modifier === 'am' && hoursInt === 12) hoursInt = 0;
        
        return hoursInt * 60 + minutes; 
      };

      const timeComparison = parseTime(a.timeStart) - parseTime(b.timeStart);
      if (timeComparison !== 0) return timeComparison;

      return a.slot.localeCompare(b.slot);
    });
  };

  const [selectedLab, setSelectedLab] = useState(originalReservation.laboratory || location.state?.laboratory || "Gokongwei 307A");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("07:30 AM - 08:00 AM");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlotData[]>(sortReservations(location.state?.selectedSlots || []));
  const [isAnonymousToggle, setIsAnonymousToggle] = useState(originalReservation.isAnonymous || location.state?.isAnonymous || false);
  const [reservationId, setReservationId] = useState(originalReservation._id || location.state?.reservationId || null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(originalReservation)
    if (reservationId === null) {
      setError("Reservation not found.");
    }

    if (Object.keys(originalReservation).length) {
      handleSlotRetrieval();
    }


  }, [originalReservation, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleSlotRetrieval = () => {
    const currentSelections = originalReservation.reservedSlots;
    console.log(currentSelections)

    const formattedSelections = currentSelections.map((item: any) => {
      return {
        slot: item.slot,
        date: formatDate(new Date(item.timeStart)),
        timeStart: formatTime(item.timeStart),
        timeEnd: formatTime(item.timeEnd)
      }
    });

    setSelectedSlots(sortReservations([...formattedSelections, ...selectedSlots]));
  }

  const getSlotStatus = (deskId: string) => {
    return reservedSlots.includes(deskId) ? 'reserved' : 'available';
  };

  const handleSlotClick = (deskId: string) => {
    if (getSlotStatus(deskId) === 'reserved') {
      alert("This slot is already taken for the selected time!");
      return;
    }

    navigate('/edit-timetable', { 
      state: { 
        laboratory: selectedLab, 
        slot: deskId,
        selectedSlots: selectedSlots,
        reservationId: reservationId,
        isAnonymous: isAnonymousToggle
      } 
    });
  };

  const convertToUTC = (dateStr: string, timeStr: string) => {
    let [hours, minAmPm] = timeStr.split(':');
    let minutes = minAmPm.substring(0, 2);
    let modifier = minAmPm.substring(2); 

    let hoursInt = parseInt(hours, 10);
    if (modifier === 'pm' && hoursInt < 12) hoursInt += 12;
    if (modifier === 'am' && hoursInt === 12) hoursInt = 0;

    const paddedHours = hoursInt.toString().padStart(2, '0');
    return new Date(`${dateStr}T${paddedHours}:${minutes}:00.000Z`);
  };

  const handleReservation = async () => {
    const storedUser = localStorage.getItem('user'); 
      if (!storedUser) {
        alert("You must be logged in to make a reservation!");
        return;
      }

      let currentUserId = "";
      try {
        const parsedUser = JSON.parse(storedUser);
        currentUserId = parsedUser._id || parsedUser.id;
      } catch (e) {
        currentUserId = storedUser; 
      }

      if (selectedSlots.length === 0) {
        alert("Select a slot first.");
        return;
      }

      const confirmBooking = window.confirm(`Edit reservation?`);
      if (!confirmBooking) return;

      const finalSlots: FinalReservedSlots[] = selectedSlots.map((item) => ({
        slot: item.slot,
        timeStart: convertToUTC(item.date, item.timeStart).toISOString(),
        timeEnd: convertToUTC(item.date, item.timeEnd).toISOString()
      }))

      try {
        const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isAnonymous: isAnonymousToggle, 
            status: 'active',
            reservedSlots: finalSlots
          })
        });

        if (response.ok) {
          alert("🎉 Reservation successfully edited!");
          navigate('/viewprofile');
        } else {
          const errorData = await response.json();
          alert(`Failed to edit: ${errorData.error || errorData.message}`);
        }
      } catch (err) {
        console.error(err);
        alert("Network error. Please try again.");
      }
  }

  return (
    <>
      <div className="pageContainer">
        <div className="boardSection">
          <Board title="Edit Reservation" room={selectedLab}>
            <div className="boardInternalLayout">
              <section className="instructionSectionInside">

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', marginBottom: '1rem'}}>
                  <input
                    type="checkbox"
                    checked={isAnonymousToggle}
                    onChange={(e) => setIsAnonymousToggle(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  Reserve Anonymously
                </label>

                <div className="howToBox">
                  <h2>Edit Mode</h2>
                  <p>
                    Select an available seat to proceed to the timetable selection.
                  </p>
                </div>

                <h3>Current Selections:</h3>
                <div className="currentSelectionSlots">
                  {selectedSlots.length === 0 ? (
                    <p>
                      No seats selected yet. Click a slot to start!
                    </p>
                  ) : (
                    selectedSlots.map((item: any, index: number) => (
                      <div key={index}>
                        <p>
                          {index + 1}. Slot {item.slot} | {item.date} | {item.timeStart} - {item.timeEnd}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="currentTimeBox">
                  <h4>Current Time:</h4>
                  <p className="timeDisplay">{currentTime}</p>
                </div>
                
                <button className="otherLabsBtn"><a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Back to Home</a></button>
              </section>

              <div className="deskGridArea"> <br />
                <div className={styles.deskRow}>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'A1', status: getSlotStatus('A1') }, { id: 'A2', status: getSlotStatus('A2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'A3', status: getSlotStatus('A3') }, { id: 'A4', status: getSlotStatus('A4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'A5', status: getSlotStatus('A5') }, { id: 'A6', status: getSlotStatus('A6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'A7', status: getSlotStatus('A7') }, { id: 'A8', status: getSlotStatus('A8') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'B1', status: getSlotStatus('B1') }, { id: 'B2', status: getSlotStatus('B2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'B3', status: getSlotStatus('B3') }, { id: 'B4', status: getSlotStatus('B4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'B5', status: getSlotStatus('B5') }, { id: 'B6', status: getSlotStatus('B6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'B7', status: getSlotStatus('B7') }, { id: 'B8', status: getSlotStatus('B8') }]} />
                  </div>
                </div>

                <div className={styles.deskRow}>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'C1', status: getSlotStatus('C1') }, { id: 'C2', status: getSlotStatus('C2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'C3', status: getSlotStatus('C3') }, { id: 'C4', status: getSlotStatus('C4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'C5', status: getSlotStatus('C5') }, { id: 'C6', status: getSlotStatus('C6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'C7', status: getSlotStatus('C7') }, { id: 'C8', status: getSlotStatus('C8') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'D1', status: getSlotStatus('D1') }, { id: 'D2', status: getSlotStatus('D2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'D3', status: getSlotStatus('D3') }, { id: 'D4', status: getSlotStatus('D4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'D5', status: getSlotStatus('D5') }, { id: 'D6', status: getSlotStatus('D6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'D7', status: getSlotStatus('D7') }, { id: 'D8', status: getSlotStatus('D8') }]} />
                  </div>
                </div>

                <div className={styles.deskRow}>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'E1', status: getSlotStatus('E1') }, { id: 'E2', status: getSlotStatus('E2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'E3', status: getSlotStatus('E3') }, { id: 'E4', status: getSlotStatus('E4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'E5', status: getSlotStatus('E5') }, { id: 'E6', status: getSlotStatus('E6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'E7', status: getSlotStatus('E7') }, { id: 'E8', status: getSlotStatus('E8') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'F1', status: getSlotStatus('F1') }, { id: 'F2', status: getSlotStatus('F2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'F3', status: getSlotStatus('F3') }, { id: 'F4', status: getSlotStatus('F4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'F5', status: getSlotStatus('F5') }, { id: 'F6', status: getSlotStatus('F6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} topSlots={[{ id: 'F7', status: getSlotStatus('F7') }, { id: 'F8', status: getSlotStatus('F8') }]} />
                  </div>
                </div>

                <div className={styles.deskRow}>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'G1', status: getSlotStatus('G1') }, { id: 'G2', status: getSlotStatus('G2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'G3', status: getSlotStatus('G3') }, { id: 'G4', status: getSlotStatus('G4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'G5', status: getSlotStatus('G5') }, { id: 'G6', status: getSlotStatus('G6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'G7', status: getSlotStatus('G7') }, { id: 'G8', status: getSlotStatus('G8') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'H1', status: getSlotStatus('H1') }, { id: 'H2', status: getSlotStatus('H2') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'H3', status: getSlotStatus('H3') }, { id: 'H4', status: getSlotStatus('H4') }]} />
                  </div>
                  <div className={styles.deskPair}>
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'H5', status: getSlotStatus('H5') }, { id: 'H6', status: getSlotStatus('H6') }]} />
                    <Desk onSelectionSubmit={handleSlotClick} bottomSlots={[{ id: 'H7', status: getSlotStatus('H7') }, { id: 'H8', status: getSlotStatus('H8') }]} />
                  </div>
                </div>
                <button
                  className="bookSlotsButton"
                  onClick={handleReservation}
                >
                  Book Slots
                </button>
              </div>
            </div>
          </Board>
        </div>
      </div>
    </>
  );
};

export default EditBoardSelection;