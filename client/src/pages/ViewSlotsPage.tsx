import Desk from '../components/Desk/Desk.tsx';
import Board from '../components/Board/Board.tsx';
import styles from '../components/Board/Board.module.css'
import slotStyles from './ViewSlotsPage.module.css';

const ViewSlots = () => {
    return (
        <>  
            <div className={slotStyles.pageContainer}>
                <div className={slotStyles.leftColumn}>
                <Board title="Gokongwei 307A">
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

                <aside className={slotStyles.rightColumn}>
                <div className={slotStyles.sidePanel}>
                    <h3>Reservation Reminders</h3>
                    <p>Use the time drop-down to check slot availability.</p>
                </div>
                
                <div className={slotStyles.sidePanel}>
                    <h3>Edit Reservation</h3>
                    <div className={slotStyles.inputGroup}>
                        <label>Laboratory:</label>
                        <input type="text" readOnly value="Gokongwei 307A" />
                    </div>
                    <div className={slotStyles.inputGroup}>
                        <label>Time Start:</label>
                        <select>{/* Options */}</select>
                    </div>
                    <div className={slotStyles.inputGroup}>
                        <label>Time End:</label>
                        <select>{/* Options */}</select>
                    </div>
                    <button className={slotStyles.createBtn}>Create Reservation</button>
                </div>
            </aside>
            </div>
        </>
    );
};

export default ViewSlots;