import React, { useState } from 'react';
import styles from './Slot.module.css';

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable'; 
  /* Available: Green, Reserved: Yellow, Unavailable: Red */
}

const Slot: React.FC<SlotProps> = ({ id, status }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusClass = styles[status];

  return (
    <div className={styles.slotContainer}>
      <button 
        className={`${styles.slotButton} ${statusClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {id}
      </button>

      {isOpen && (
        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          <div className={styles.dropdownItem}>Reserve {id}</div>
          <div className={styles.dropdownItem}>View Specs</div>
          <div className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Close</div>
        </div>
      )}
    </div>
  );
};

export default Slot;