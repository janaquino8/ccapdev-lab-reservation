import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Viewslot.module.css';

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  isOpen: boolean;
  onToggle: (id: string) => void;
  reservedBy?: string;
  isAnonymous?: boolean;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, reservedBy = "John Doe", isAnonymous = false }) => {
  const statusClass = styles[status];
  const navigate = useNavigate(); //

  const handleReserve = () => {
    onToggle('');
    navigate(`/reserve`);
  };

  const getDisplayName = () => {
    if (status === 'available') return "None";
    if (status === 'unavailable') return "Maintenance";
    return isAnonymous ? "Anonymous" : reservedBy;
  };

  return (
    <div className={styles.slotContainer}>
      <button
        className={`${styles.slotButton} ${statusClass}`}
        onClick={() => onToggle(id)}
      >
        {id}
      </button>

      {isOpen && (
        <div className={styles.infoPopup} onClick={(e) => e.stopPropagation()}>
          <div className={styles.infoTitle}>Seat {id}</div>
          <div className={styles.infoContent}>
            Reserved by: <span className={styles.nameText}>{getDisplayName()}</span>
          </div>
          {!isAnonymous && status === 'reserved' && (
            <div className={styles.profileLink}>View Profile</div>
          )}
          {status === 'available' && (
            <div className={styles.reserveActionBtn} onClick={handleReserve}>Reserve Slot</div>
          )}
          <button className={styles.closeBtn} onClick={() => onToggle('')}>X</button>
        </div>
      )}
    </div>
  );
};

export default Slot;