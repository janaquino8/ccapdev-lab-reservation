import React, { useState } from 'react';
import ViewSlot from '../ViewSlot/ViewSlot.tsx';
import styles from '../Desk/Desk.module.css';

interface UserData {
  name: string,
  username: string
}

interface ReserveData {
  date: string,
  time: string,
  lab: string
}

interface SlotData {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  reservedBy: UserData,
  isAllSelected: boolean,
  reserveInfo: ReserveData
}

interface ViewDeskProps {
  topSlots?: SlotData[];   
  bottomSlots?: SlotData[];
}

const ViewDesk: React.FC<ViewDeskProps> = ({ topSlots, bottomSlots }) => {
  const [openSlotId, setOpenSlotId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenSlotId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={styles.deskWrapper}>
      {topSlots && (
        <div className={styles.row}>
          {topSlots.map((slot) => (
            <ViewSlot 
              key={slot.id} 
              id={slot.id} 
              status={slot.status} 
              reservedBy={slot.reservedBy} 
              isOpen={openSlotId === slot.id} 
              onToggle={handleToggle} 
              isAllSelected={slot.isAllSelected}
              reserveInfo={slot.reserveInfo}
            />
          ))}
        </div>
      )}

      <div className={styles.tableSurface}></div>

      {bottomSlots && (
        <div className={styles.row}>
          {bottomSlots.map((slot) => (
            <ViewSlot 
              key={slot.id} 
              id={slot.id} 
              status={slot.status} 
              reservedBy={slot.reservedBy} 
              isOpen={openSlotId === slot.id} 
              onToggle={handleToggle} 
              isAllSelected={slot.isAllSelected}
              reserveInfo={slot.reserveInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDesk;