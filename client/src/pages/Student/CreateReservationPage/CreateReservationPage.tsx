import React from "react";
import Desk from '../../../components/Desk/Desk.tsx';
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import "./CreateReservationPage.css";

const CreateReservation: React.FC = () => {
  return (
    <>
      <div className="pageContainer">
        <div className="leftColumn">
          <Board title="Create Reservation" room="Gokongwei 307A">
            <div className={styles.deskRow}>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
              </div>
            </div>

            {/* Bottom Rows */}
            <div className={styles.deskRow}>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
              </div>
            </div>

            {/* Repeat Top Rows */}
            <div className={styles.deskRow}>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk topSlots={[{ id: 'A5', status: 'available' }, { id: 'A6', status: 'available' }]} />
                <Desk topSlots={[{ id: 'A7', status: 'available' }, { id: 'A8', status: 'available' }]} />
              </div>
            </div>

            {/* Repeat Bottom Rows */}
            <div className={styles.deskRow}>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B3', status: 'available' }, { id: 'B4', status: 'available' }]} />
              </div>
              <div className={styles.deskPair}>
                <Desk bottomSlots={[{ id: 'B5', status: 'available' }, { id: 'B6', status: 'available' }]} />
                <Desk bottomSlots={[{ id: 'B7', status: 'available' }, { id: 'B8', status: 'available' }]} />
              </div>
            </div>
          </Board>
        </div>

        <aside className="rightColumn">
          <div className="sidePanel">
            <h3>Reservation Reminders</h3>
            <p>Ensure your selected time slot does not conflict with existing laboratory schedules.</p>
          </div>

          <div className="sidePanel">
            <h3>Reserve A Slot</h3>
            
            <div className="inputGroup">
              <label>Laboratory:</label>
              <select id="laboratory">
                <option value="">Select Laboratory</option>
                <option value="lab1">Gokongwei 307A</option>
                <option value="lab2">Gokongwei 307B</option>
                <option value="lab3">Gokongwei 404A</option>
              </select>
            </div>

            <div className="inputGroup">
              <label>Time Start:</label>
              <select id="time-start">
                <option value="">Select Start Time</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
              </select>
            </div>

            <div className="inputGroup">
              <label>Time End:</label>
              <select id="time-end">
                <option value="">Select End Time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
              </select>
            </div>

            <div className="inputGroup horizontal">
              <div className="subGroup">
                <label>Row:</label>
                <select id="row">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="subGroup">
                <label>Column:</label>
                <select id="column">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <button className="createBtn">Reserve Slot</button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CreateReservation;