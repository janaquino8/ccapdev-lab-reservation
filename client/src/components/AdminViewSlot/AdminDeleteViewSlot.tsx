import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDeleteViewslot.module.css';

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  isOpen: boolean;
  onToggle: (id: string) => void;
  reservedBy?: string;
  isAnonymous?: boolean;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, reservedBy, isAnonymous = false }) => {
  const statusClass = styles[status];
  const navigate = useNavigate(); 

  //modify for delete
  const handleReserve = () => {
    onToggle('');
    navigate(`/admin/reserve`);
  };

  const handleDelete = async (slotId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${slotId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Reservation deleted!");
        onToggle(''); // close popup
        // optionally refresh data here
      } else {
        alert("Failed to delete reservation");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDisplayName = () => {
    if (status === 'available') return "None";
    if (status === 'unavailable') return "Maintenance";
    if (status === 'reserved' && !reservedBy) {
      return "Loading..."; 
    }

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
            <>
              <div 
                className={styles.profileLink} 
                onClick={() => navigate(`/profile/${reservedBy}`)}
              >
                View Profile
              </div>

              <div 
                className={styles.reserveActionBtn} 
                onClick={() => handleDelete(id)}
              >
                Delete Reservation
              </div>
            </>
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