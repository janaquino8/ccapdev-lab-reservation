import React from 'react';
import styles from './Slot.module.css';

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  /* Available: Green, Reserved: Yellow, Unavailable: Red */
  isOpen: boolean;
  onToggle: (id: string) => void;
  onSelectionSubmit: (deskId: string) => void;
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, onSelectionSubmit }) => {
  const statusClass = styles[status];

  return (
    <div className={styles.slotContainer}>
      <button
        className={`${styles.slotButton} ${statusClass}`}
        onClick={() => onSelectionSubmit(id)}
      >
        {id}
      </button>
    </div>
  );
};

export default Slot;