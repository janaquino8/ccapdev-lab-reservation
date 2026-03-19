import React, { useState } from 'react';
import Slot from './../Slot/Slot';
import styles from './Desk.module.css';

interface SlotData {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
}

interface DeskProps {
  topSlots?: SlotData[];   
  bottomSlots?: SlotData[];
  onSlotClick: (id: string) => void;
}

const Desk: React.FC<DeskProps> = ({ topSlots, bottomSlots, onSlotClick }) => {
  const [openSlotId, setOpenSlotId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenSlotId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={styles.deskWrapper}>
      {topSlots && (
        <div className={styles.row}>
          {topSlots.map((slot) => (
            <Slot 
              key={slot.id} 
              id={slot.id} 
              status={slot.status} 
              isOpen={openSlotId === slot.id} 
              onToggle={handleToggle} 
              onSlotClick={onSlotClick}
            />
          ))}
        </div>
      )}

      <div className={styles.tableSurface}></div>

      {bottomSlots && (
        <div className={styles.row}>
          {bottomSlots.map((slot) => (
            <Slot 
              key={slot.id} 
              id={slot.id} 
              status={slot.status} 
              isOpen={openSlotId === slot.id} 
              onToggle={handleToggle} 
              onSlotClick={onSlotClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Desk;