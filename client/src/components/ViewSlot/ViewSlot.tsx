import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Viewslot.module.css';

interface UserData {
  name: string,
  username: string
}

interface ReserveData {
  date: string,
  time: string,
  lab: string
}

interface SlotProps {
  id: string;
  status: 'available' | 'reserved' | 'unavailable';
  isOpen: boolean;
  onToggle: (id: string) => void;
  reservedBy: UserData;
  isAnonymous?: boolean;
  isAllSelected: boolean;
  reserveInfo: ReserveData
}

const Slot: React.FC<SlotProps> = ({ id, status, isOpen, onToggle, reservedBy, isAllSelected, reserveInfo }) => {
  const statusClass = styles[status];
  const navigate = useNavigate(); 

  const [user, setUser] = useState<String>("");

  useEffect(() => {
    const storedUser: any = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username)
      console.log(user)
    }
  }, [])


  const handleViewProfile = () => {
    onToggle('');

    if (user === reservedBy.username) {
      navigate('/viewprofile')
    } else {
      navigate(`/profile/${reservedBy.username}`)
    }
  }

  const handleReserve = () => {
    onToggle('');

    let [ timeStart, timeEnd ] = reserveInfo.time.replaceAll(" AM", "am").replaceAll(" PM", "pm").split(" - ").map(item => {
      if (item[0] === '0') {
        item = item.slice(1)
      }
      return item
    })

    const selectedSlot = {
      slot: id,
      date: reserveInfo.date,
      timeStart: timeStart,
      timeEnd: timeEnd
    }

    navigate(`/create`, { state: { selectedSlots: [selectedSlot], laboratory: reserveInfo.lab } });
  };

  const getDisplayName = () => {
    if (status === 'available') return "None";
    if (status === 'unavailable') return "Maintenance";
    if (status === 'reserved' && !reservedBy.name) {
      return "Loading..."; 
    }

    return reservedBy.name;
  };

  const isDateTimeValid = () => {
    const [ year, month, day ] = reserveInfo.date.split("-").map(item => Number(item));
    const [ hour, minute ] = reserveInfo.time.split(" - ")[0].replace(" AM", "").replace(" PM", "").split(":").map(item => Number(item))

    const now = new Date()
    const selected = new Date(
      year, 
      month - 1, 
      day,
      hour + (reserveInfo.time[6] === 'P' && hour < 12 ? 12 : 0),
      minute
    )

    return now < selected
  }

  return (
    <div className={styles.slotContainer}>
      <button
        className={`${styles.slotButton} ${statusClass}`}
        onClick={() => onToggle(id)}
      >
        {id}
      </button>

      {isOpen && isAllSelected && (
        <div className={styles.infoPopup} onClick={(e) => e.stopPropagation()}>
          <div className={styles.infoTitle}>Seat {id}</div>
          <div className={styles.infoContent}>
            Reserved by: <span className={styles.nameText}>{getDisplayName()}</span>
          </div>
          {reservedBy.username && status === 'reserved' && (
            <div className={styles.profileLink} onClick={handleViewProfile}>View Profile</div>
          )}
          {status === 'available' && isDateTimeValid() && (
            <div className={styles.reserveActionBtn} onClick={handleReserve}>Reserve Slot</div>
          )}
          <button className={styles.closeBtn} onClick={() => onToggle('')}>X</button>
        </div>
      )}
    </div>
  );
};

export default Slot;