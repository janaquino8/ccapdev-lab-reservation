import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminSlot.module.css';


interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  /* Available: Green, Reserved: Yellow, Unavailable: Red */
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle }) => {
  const statusClass = styles[status];
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/admin/reserve', { state: { slotId: id } });
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
        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          <div className={styles.dropdownItem} onClick={handleReserveClick}>
            Reserve {id}
          </div>
          <div className={styles.dropdownItem}>View Specs</div>
          <div className={styles.dropdownItem} onClick={() => onToggle('')}>Close</div>
        </div>
      )}
    </div>
  );
};

export default Slot;