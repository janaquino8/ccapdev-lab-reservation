import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Viewslot.module.css';

interface UserData {
  name: string,
  username: string
}

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  isOpen: boolean;
  onToggle: (id: string) => void;
  reservedBy: UserData;
  isAnonymous?: boolean;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, reservedBy}) => {
  const statusClass = styles[status];
  const navigate = useNavigate(); 

  const handleViewProfile = () => {
    onToggle('');
    navigate(`/profile/${reservedBy.username}`)
  }

  const handleReserve = () => {
    onToggle('');
    navigate(`/reserve`);
  };

  const getDisplayName = () => {
    if (status === 'available') return "None";
    if (status === 'unavailable') return "Maintenance";
    if (status === 'reserved' && !reservedBy.name) {
      return "Loading..."; 
    }

    return reservedBy.name;
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
          {reservedBy.username && status === 'reserved' && (
            <div className={styles.profileLink} onClick={handleViewProfile}>View Profile</div>
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