import React from 'react';
import ViewDesk from '../../../components/ViewDesk/ViewDesk.tsx';
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import dlsuLABS from '../../../assets/dlsuLABS.png'; 
import './ViewSlotsPage.css';

const ViewSlots = () => {
    return (
        <div className="pageContainer">
            <div className="leftColumn">
                <Board title="View Slots" room="Gokongwei 307A">
                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
                        </div>
                    </div>

                    {/* Bottom Rows */}
                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
                        </div>
                    </div>

                    {/* Repeat Top Rows */}
                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                            <ViewDesk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
                        </div>
                    </div>

                    {/* Repeat Bottom Rows */}
                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
                        </div>
                        <div className={styles.deskPair}>
                            <ViewDesk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                            <ViewDesk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
                        </div>
                    </div>
                </Board>
            </div>

            <aside className="rightColumn">
                <div className="sidePanel">
                    <h3>Reservation Reminders</h3>
                    <p>
                        Use the time drop-down to check slot availability.
                    </p>
                </div>

                <div className="sidePanel">
                    <h3>Check Other Timeslots</h3>

                    <div className="inputGroup">
                        <label>Laboratory:</label>
                        <select className="fullWidthSelect">
                            <option>Gokongwei 307A</option>
                            <option>Gokongwei 307B</option>
                            <option>Gokongwei 404A</option>
                        </select>
                    </div>

                    <div className="inputGroup">
                        <label>Time Slot:</label>
                        <select className="fullWidthSelect">
                            <option>07:30 AM - 08:00 AM</option>
                            <option>08:00 AM - 08:30 AM</option>
                            <option>08:30 AM - 09:00 AM</option>
                            <option>09:00 AM - 09:30 AM</option>
                            <option>09:30 AM - 10:00 AM</option>
                            <option>10:00 AM - 10:30 AM</option>
                            <option>10:30 AM - 11:00 AM</option>
                            <option>11:00 AM - 11:30 AM</option>
                            <option>11:30 AM - 12:00 PM</option>
                            <option>12:00 PM - 12:30 PM</option>
                            <option>12:30 PM - 01:00 PM</option>
                            <option>01:00 PM - 01:30 PM</option>
                            <option>01:30 PM - 02:00 PM</option>
                            <option>02:00 PM - 02:30 PM</option>
                            <option>02:30 PM - 03:00 PM</option>
                            <option>03:00 PM - 03:30 PM</option>
                            <option>03:30 PM - 04:00 PM</option>
                            <option>04:00 PM - 04:30 PM</option>
                            <option>04:30 PM - 05:00 PM</option>
                        </select>
                    </div>

                    <button className="createBtn">View Slots</button>
                </div>

                <button className="otherLabsBtn"><a href="/home">Back to Home</a></button>

                <div className="bottomLogoContainer">
                    <img src={dlsuLABS} alt="DLSU LABS" className="sidebarLogo" />
                </div>
            </aside>
        </div>
    );
};

export default ViewSlots;