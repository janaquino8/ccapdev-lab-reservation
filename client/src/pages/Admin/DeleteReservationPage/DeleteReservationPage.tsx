import Desk from '../../../components/Desk/Desk.tsx';
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css'
import './DeleteReservationPage.css';

const DeleteReservation = () => {
    return (
        <>  
            <div className="pageContainer">
                <div className="leftColumn">
                <Board title="Delete Reservation" room="Gokongwei 307A">
                   <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A1', status: 'available'}, {id: 'A2', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A3', status: 'available'}, {id: 'A4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A5', status: 'available'}, {id: 'A6', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A7', status: 'available'}, {id: 'A8', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A1', status: 'available'}, {id: 'A2', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A3', status: 'available'}, {id: 'A4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A5', status: 'available'}, {id: 'A6', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A7', status: 'available'}, {id: 'A8', status: 'available'}]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                       <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B1', status: 'available'}, {id: 'B2', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B3', status: 'available'}, {id: 'B4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B5', status: 'available'}, {id: 'B6', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B7', status: 'available'}, {id: 'B8', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B1', status: 'available'}, {id: 'B2', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B3', status: 'available'}, {id: 'B4', status: 'available'}]} />
                            </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B5', status: 'available'}, {id: 'B6', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B7', status: 'available'}, {id: 'B8', status: 'available'}]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A1', status: 'available'}, {id: 'A2', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A3', status: 'available'}, {id: 'A4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A5', status: 'available'}, {id: 'A6', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A7', status: 'available'}, {id: 'A8', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A1', status: 'available'}, {id: 'A2', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A3', status: 'available'}, {id: 'A4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk topSlots={[{id: 'A5', status: 'available'}, {id: 'A6', status: 'available'}]} />
                            <Desk topSlots={[{id: 'A7', status: 'available'}, {id: 'A8', status: 'available'}]} />
                        </div>
                    </div>

                    <div className={styles.deskRow}>
                       <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B1', status: 'available'}, {id: 'B2', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B3', status: 'available'}, {id: 'B4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B5', status: 'available'}, {id: 'B6', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B7', status: 'available'}, {id: 'B8', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B1', status: 'available'}, {id: 'B2', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B3', status: 'available'}, {id: 'B4', status: 'available'}]} />
                        </div>
                        <div className={styles.deskPair}>
                            <Desk bottomSlots={[{id: 'B5', status: 'available'}, {id: 'B6', status: 'available'}]} />
                            <Desk bottomSlots={[{id: 'B7', status: 'available'}, {id: 'B8', status: 'available'}]} />
                        </div>
                    </div>
                </Board>
                </div>

                <aside className="rightColumn">
                <div className="sidePanel">
                    <h3>Reservation Reminders</h3>
                    <p>Use the time drop-down to check slot availability.</p>
                </div>
                
                <div className="sidePanel">
                    <h3>Delete Reservation</h3>
                    <div className="inputGroup">
                        <label>Laboratory:</label>
                        <input type="text" readOnly value="Gokongwei 307A" />
                    </div>
                    <div className="inputGroup">
                        <label>Reservation Name:</label>
                        <input type="text" readOnly value="John Pork" />
                    </div>
                    <div className="inputGroup">
                        <label>Time Start:</label>
                        <input type="text" readOnly value="12:30pm" />
                    </div>
                    <div className="inputGroup">
                        <label>Time End:</label>
                        <input type="text" readOnly value="1:00pm"/>
                    </div>
                    <button className="createBtn">Delete Reservation</button>
                </div>
            </aside>
            </div>
        </>
    );
};

export default DeleteReservation;