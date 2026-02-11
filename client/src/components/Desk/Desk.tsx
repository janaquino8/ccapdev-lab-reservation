import React from 'react';
import Slot from './../Slot/Slot';
import styles from './Desk.module.css';
import { useState } from 'react';

interface SlotData {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
}

interface DeskProps {
  topSlots?: SlotData[];   
  bottomSlots?: SlotData[];
}

const Desk: React.FC<DeskProps> = ({ topSlots, bottomSlots }) => {
  const [openSlotId, setOpenSlotId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenSlotId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={styles.deskWrapper}>
      {topSlots && (
        <div className={styles.row}>
          {topSlots.map((slot) => (
            <Slot key={slot.id} id={slot.id} status={slot.status} isOpen={openSlotId === slot.id} onToggle={handleToggle} />
          ))}
        </div>
      )}

      <div className={styles.tableSurface}></div>

      {bottomSlots && (
        <div className={styles.row}>
          {bottomSlots.map((slot) => (
            <Slot key={slot.id} id={slot.id} status={slot.status} isOpen={openSlotId === slot.id} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Desk;