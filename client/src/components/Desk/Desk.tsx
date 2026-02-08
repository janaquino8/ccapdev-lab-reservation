import React from 'react';
import Slot from './../Slot/Slot';
import styles from './Desk.module.css';

interface SlotData {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
}

interface DeskProps {
  topSlots?: SlotData[];    // ? makes this optional
  bottomSlots?: SlotData[]; // ? makes this optional
}

const Desk: React.FC<DeskProps> = ({ topSlots, bottomSlots }) => {
  return (
    <div className={styles.deskWrapper}>
      {/* Only render the top row if topSlots is provided */}
      {topSlots && (
        <div className={styles.row}>
          {topSlots.map((slot) => (
            <Slot key={slot.id} id={slot.id} status={slot.status} />
          ))}
        </div>
      )}

      {/* The table surface always stays */}
      <div className={styles.tableSurface}></div>

      {/* Only render the bottom row if bottomSlots is provided */}
      {bottomSlots && (
        <div className={styles.row}>
          {bottomSlots.map((slot) => (
            <Slot key={slot.id} id={slot.id} status={slot.status} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Desk;