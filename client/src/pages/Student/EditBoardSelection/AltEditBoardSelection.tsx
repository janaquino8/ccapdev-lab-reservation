import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Desk from '../../../components/Desk/Desk.tsx';
import Board from '../../../components/CreateBoard/CreateBoard.tsx';
import styles from '../../../components/Board/Board.module.css';
import "./../CreateReservationPage/CreateReservationPage.css"; 

const EditBoardSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { targetReservation } = location.state || {};

  const [selectedLab, setSelectedLab] = useState(targetReservation?.laboratory || "Gokongwei 307A");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("07:30 AM - 08:00 AM");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!targetReservation) {
        navigate('/edit');
    }
  }, [targetReservation, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedDate) handleViewSlots();
  }, [selectedLab, selectedDate, selectedTime]);

  const handleViewSlots = async () => {
    setError("");
    if (!selectedDate) return;

    try {
      const response = await fetch('/reservations/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ laboratory: selectedLab, date: selectedDate, time: selectedTime }),
      });

      if (response.ok) {
        const reservations = await response.json();
        const takenSlots = reservations.map((res: any) => res.slot);
        setReservedSlots(takenSlots);
      } else {
        setReservedSlots([]);
      }
    } catch (err) {
      setError("Cannot connect to server.");
    }
  };

  const getSlotStatus = (deskId: string) => reservedSlots.includes(deskId) ? 'reserved' : 'available';

  const handleSlotClick = (deskId: string) => {
    if (getSlotStatus(deskId) === 'reserved') {
      alert("This slot is already taken for the selected time preview!");
      return;
    }

    navigate('/edit-timetable', { 
      state: { 
        targetReservation: targetReservation,
        newLaboratory: selectedLab, 
        newSlot: deskId 
      } 
    });
  };

  if (!targetReservation) return null;

  return (
    <div className="pageContainer">
      <div className="boardSection">
        <Board title={`Modifying Reservation`} room={selectedLab}>
          <div className="boardInternalLayout">
            <section className="instructionSectionInside">
              
              <div className="labSelectionBox" style={{ marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0 }}>Select New Laboratory</h3>
                <select 
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                  style={{ padding: '8px', width: '100%', fontSize: '16px', color: 'black' }}
                >
                  <option value="Gokongwei 307A">Gokongwei 307A</option>
                  <option value="Gokongwei 307B">Gokongwei 307B</option>
                  <option value="Gokongwei 404A">Gokongwei 404A</option>
                </select>
              </div>

              <div className="howToBox">
                <h2>Edit Mode</h2>
                <p>
                  Select a new laboratory and click on an available seat to proceed to the timetable selection.
                </p>
              </div>

              <div className="currentTimeBox">
                <h4>Current Time:</h4>
                <p className="timeDisplay">{currentTime}</p>
              </div>

              <button className="otherLabsBtn" onClick={() => navigate('/edit')}>
                Cancel Edit
              </button>
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
            </div>
          </div>
        </Board>
      </div>
    </div>
  );
};

export default EditBoardSelection;