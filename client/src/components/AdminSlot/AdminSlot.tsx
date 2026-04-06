import React from 'react';
import styles from './AdminSlot.module.css';

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  /* Available: Green, Reserved: Yellow, Unavailable: Red */
  isOpen: boolean;
  onToggle: (id: string) => void;
  onSlotClick: (id: string) => void;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, onSlotClick }) => {
  const statusClass = styles[status];

  return (
    <div className={styles.slotContainer}>
      <button
        className={`${styles.slotButton} ${statusClass}`}
        onClick={() => onSlotClick(id)}
      >
        {id}
      </button>
    </div>
  );
};

export default Slot;