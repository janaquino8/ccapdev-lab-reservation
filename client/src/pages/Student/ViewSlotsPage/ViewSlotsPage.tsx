import React, { useState } from 'react';
import ViewDesk from '../../../components/ViewDesk/ViewDesk.tsx';
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import dlsuLABS from '../../../assets/dlsuLABS.png'; 
import './ViewSlotsPage.css';

const ViewSlots = () => {
    const [selectedLab, setSelectedLab] = useState("Gokongwei 307A");
    const [selectedDate, setSelectedDate] = useState(""); 
    const [selectedTime, setSelectedTime] = useState("07:30 AM - 08:00 AM");
    
    const [reservedSlots, setReservedSlots] = useState<string[]>([]);
    const [reservedNames, setReservedNames] = useState<Record<string, string>>({});
    const [error, setError] = useState("");

    const handleViewSlots = async () => {
        setError("");
        
        if (!selectedDate) {
            setError("Please select a date first.");
            return;
        }

        console.log(`Searching for ${selectedLab} on ${selectedDate} at ${selectedTime}...`);

        try {
            const response = await fetch('http://localhost:3000/reservations/search', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    laboratory: selectedLab, 
                    date: selectedDate,
                    time: selectedTime 
                }),
            });

            if (response.ok) {
                const reservations = await response.json();

                const takenSlots = reservations.map((res: any) => res.slot); 

                const namesDictionary: Record<string, string> = {};
                reservations.forEach((res: any) => {
                    namesDictionary[res.slot] = res.reserverName;
                });

                setReservedSlots(takenSlots);
                setReservedNames(namesDictionary); 
            } else {
                setError("No reservations found for this time.");
                setReservedSlots([]);
                setReservedNames({});
            }
        } catch (err) {
            console.error(err);
            setError("Cannot connect to server.");
        }
    };

    const getSlotStatus = (deskId: string) => {
        return reservedSlots.includes(deskId) ? 'reserved' : 'available';
    };

    const getSlotName = (deskId: string) => {
        return reservedNames[deskId];
    };

    return (
        <div className="pageContainer">
            <div className="leftColumn">
                <Board title="View Slots" room={selectedLab}>
                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A1', status: getSlotStatus('A1'), reservedBy: getSlotName('A1') }, { id: 'A2', status: getSlotStatus('A2'), reservedBy: getSlotName('A2') }]} />
                            <ViewDesk topSlots={[{ id: 'A3', status: getSlotStatus('A3'), reservedBy: getSlotName('A3') }, { id: 'A4', status: getSlotStatus('A4'), reservedBy: getSlotName('A4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A5', status: getSlotStatus('A5'), reservedBy: getSlotName('A5') }, { id: 'A6', status: getSlotStatus('A6'), reservedBy: getSlotName('A6') }]} />
                            <ViewDesk topSlots={[{ id: 'A7', status: getSlotStatus('A7'), reservedBy: getSlotName('A7') }, { id: 'A8', status: getSlotStatus('A8'), reservedBy: getSlotName('A8') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'B1', status: getSlotStatus('B1'), reservedBy: getSlotName('B1') }, { id: 'B2', status: getSlotStatus('B2'), reservedBy: getSlotName('B2') }]} />
                            <ViewDesk topSlots={[{ id: 'B3', status: getSlotStatus('B3'), reservedBy: getSlotName('B3') }, { id: 'B4', status: getSlotStatus('B4'), reservedBy: getSlotName('B4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'B5', status: getSlotStatus('B5'), reservedBy: getSlotName('B5') }, { id: 'B6', status: getSlotStatus('B6'), reservedBy: getSlotName('B6') }]} />
                            <ViewDesk topSlots={[{ id: 'B7', status: getSlotStatus('B7'), reservedBy: getSlotName('B7') }, { id: 'B8', status: getSlotStatus('B8'), reservedBy: getSlotName('B8') }]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'C1', status: getSlotStatus('C1'), reservedBy: getSlotName('C1') }, { id: 'C2', status: getSlotStatus('C2'), reservedBy: getSlotName('C2') }]} />
                            <ViewDesk bottomSlots={[{ id: 'C3', status: getSlotStatus('C3'), reservedBy: getSlotName('C3') }, { id: 'C4', status: getSlotStatus('C4'), reservedBy: getSlotName('C4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'C5', status: getSlotStatus('C5'), reservedBy: getSlotName('C5') }, { id: 'C6', status: getSlotStatus('C6'), reservedBy: getSlotName('C6') }]} />
                            <ViewDesk bottomSlots={[{ id: 'C7', status: getSlotStatus('C7'), reservedBy: getSlotName('C7') }, { id: 'C8', status: getSlotStatus('C8'), reservedBy: getSlotName('C8') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'D1', status: getSlotStatus('D1'), reservedBy: getSlotName('D1') }, { id: 'D2', status: getSlotStatus('D2'), reservedBy: getSlotName('D2') }]} />
                            <ViewDesk bottomSlots={[{ id: 'D3', status: getSlotStatus('D3'), reservedBy: getSlotName('D3') }, { id: 'D4', status: getSlotStatus('D4'), reservedBy: getSlotName('D4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'D5', status: getSlotStatus('D5'), reservedBy: getSlotName('D5') }, { id: 'D6', status: getSlotStatus('D6'), reservedBy: getSlotName('D6') }]} />
                            <ViewDesk bottomSlots={[{ id: 'D7', status: getSlotStatus('D7'), reservedBy: getSlotName('D7') }, { id: 'D8', status: getSlotStatus('D8'), reservedBy: getSlotName('D8') }]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'E1', status: getSlotStatus('E1'), reservedBy: getSlotName('E1') }, { id: 'E2', status: getSlotStatus('E2'), reservedBy: getSlotName('E2') }]} />
                            <ViewDesk topSlots={[{ id: 'E3', status: getSlotStatus('E3'), reservedBy: getSlotName('E3') }, { id: 'E4', status: getSlotStatus('E4'), reservedBy: getSlotName('E4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'E5', status: getSlotStatus('E5'), reservedBy: getSlotName('E5') }, { id: 'E6', status: getSlotStatus('E6'), reservedBy: getSlotName('E6') }]} />
                            <ViewDesk topSlots={[{ id: 'E7', status: getSlotStatus('E7'), reservedBy: getSlotName('E7') }, { id: 'E8', status: getSlotStatus('E8'), reservedBy: getSlotName('E8') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'F1', status: getSlotStatus('F1'), reservedBy: getSlotName('F1') }, { id: 'F2', status: getSlotStatus('F2'), reservedBy: getSlotName('F2') }]} />
                            <ViewDesk topSlots={[{ id: 'F3', status: getSlotStatus('F3'), reservedBy: getSlotName('F3') }, { id: 'F4', status: getSlotStatus('F4'), reservedBy: getSlotName('F4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'F5', status: getSlotStatus('F5'), reservedBy: getSlotName('F5') }, { id: 'F6', status: getSlotStatus('F6'), reservedBy: getSlotName('F6') }]} />
                            <ViewDesk topSlots={[{ id: 'F7', status: getSlotStatus('F7'), reservedBy: getSlotName('F7') }, { id: 'F8', status: getSlotStatus('F8'), reservedBy: getSlotName('F8') }]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'G1', status: getSlotStatus('G1'), reservedBy: getSlotName('G1') }, { id: 'G2', status: getSlotStatus('G2'), reservedBy: getSlotName('G2') }]} />
                            <ViewDesk bottomSlots={[{ id: 'G3', status: getSlotStatus('G3'), reservedBy: getSlotName('G3') }, { id: 'G4', status: getSlotStatus('G4'), reservedBy: getSlotName('G4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'G5', status: getSlotStatus('G5'), reservedBy: getSlotName('G5') }, { id: 'G6', status: getSlotStatus('G6'), reservedBy: getSlotName('G6') }]} />
                            <ViewDesk bottomSlots={[{ id: 'G7', status: getSlotStatus('G7'), reservedBy: getSlotName('G7') }, { id: 'G8', status: getSlotStatus('G8'), reservedBy: getSlotName('G8') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'H1', status: getSlotStatus('H1'), reservedBy: getSlotName('H1') }, { id: 'H2', status: getSlotStatus('H2'), reservedBy: getSlotName('H2') }]} />
                            <ViewDesk bottomSlots={[{ id: 'H3', status: getSlotStatus('H3'), reservedBy: getSlotName('H3') }, { id: 'H4', status: getSlotStatus('H4'), reservedBy: getSlotName('H4') }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'H5', status: getSlotStatus('H5'), reservedBy: getSlotName('H5') }, { id: 'H6', status: getSlotStatus('H6'), reservedBy: getSlotName('H6') }]} />
                            <ViewDesk bottomSlots={[{ id: 'H7', status: getSlotStatus('H7'), reservedBy: getSlotName('H7') }, { id: 'H8', status: getSlotStatus('H8'), reservedBy: getSlotName('H8') }]} />
                        </div>
                    </div>
                </Board>
            </div>

            <aside className="rightColumn">
                <div className="sidePanel">
                    <h3>Reminders</h3>
                    <p>Use the time drop-down to check slot availability.</p>
                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                </div>

                <div className="sidePanel">
                    <h3>Check Timeslots</h3>

                    <div className="inputGroup">
                        <label>Laboratory:</label>
                        <select 
                            className="fullWidthSelect"
                            value={selectedLab}
                            onChange={(e) => setSelectedLab(e.target.value)}
                        >
                            <option value="Gokongwei 307A">Gokongwei 307A</option>
                            <option value="Gokongwei 307B">Gokongwei 307B</option>
                            <option value="Gokongwei 404A">Gokongwei 404A</option>
                        </select>
                    </div>

                    <div className="inputGroup">
                        <label>Date:</label>
                        <input 
                            type="date" 
                            className="fullWidthSelect" 
                            style={{ padding: '8px', boxSizing: 'border-box', fontFamily: 'inherit' }}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Time Slot:</label>
                        <select 
                            className="fullWidthSelect"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            <option value="07:30 AM - 08:00 AM">07:30 AM - 08:00 AM</option>
                            <option value="08:00 AM - 08:30 AM">08:00 AM - 08:30 AM</option>
                            <option value="08:30 AM - 09:00 AM">08:30 AM - 09:00 AM</option>
                            <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                            <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                            <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                            <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                            <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                            <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                            <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
                            <option value="12:30 PM - 01:00 PM">12:30 PM - 01:00 PM</option>
                            <option value="01:00 PM - 01:30 PM">01:00 PM - 01:30 PM</option>
                            <option value="01:30 PM - 02:00 PM">01:30 PM - 02:00 PM</option>
                            <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                            <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
                            <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
                            <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                            <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
                            <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM</option>
                        </select>
                    </div>

                    <button className="createBtn" onClick={handleViewSlots}>Search</button>
                </div>

                <button className="otherLabsBtn"><a href="/home" style={{textDecoration: 'none', color: 'inherit'}}>Back to Home</a></button>

                <div className="bottomLogoContainer">
                    <img src={dlsuLABS} alt="DLSU LABS" className="sidebarLogo" />
                </div>
            </aside>
        </div>
    );
};

export default ViewSlots;