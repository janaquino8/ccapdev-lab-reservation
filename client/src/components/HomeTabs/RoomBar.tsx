import styles from './RoomBar.module.css';

const RoomBar = ({ roomName, onReserve, buttonText }: 
    { roomName: string; onReserve: () => void; buttonText: string; }) => {
  return (
    <div className={styles.roomBarContainer}>
      <div className={styles.roomInfo}>
        <h3>{roomName}</h3>
      </div>
      <button className={styles.reserveButton} onClick={onReserve}>
        {buttonText}
      </button>
    </div>
  );
};

export default RoomBar;