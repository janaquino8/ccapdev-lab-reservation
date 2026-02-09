import styles from './EditRoomBar.module.css';

interface EditRoomBarProps {
  roomName: string;
  studentId: string;
  slot: string;
  timeStart: string;
  timeEnd: string;
  onEdit: () => void;
  buttonText?: string;
}

const EditRoomBar = ({ 
  roomName, studentId, slot, timeStart, timeEnd, onEdit, buttonText = "Edit Reservation" 
}: EditRoomBarProps) => {
  return (
    <div className={styles.roomBarContainer}>
      <div className={styles.roomInfo}>
        <h3>{roomName}</h3>
      </div>
      
      <div className={styles.details}>
        <p><strong>Student No.:</strong> {studentId}</p>
        <p><strong>Slot:</strong> {slot}</p>
        <p><strong>Time Start:</strong> {timeStart}</p>
        <p><strong>Time End:</strong> {timeEnd}</p>
      </div>

      <button className={styles.reserveButton} onClick={onEdit}>
        {buttonText}
      </button>
    </div>
  );
};

export default EditRoomBar;