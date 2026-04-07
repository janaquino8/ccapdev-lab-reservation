import RoomBar from '../HomeTabs/RoomBar';
import styles from './Create.module.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const handleReserve = (room: string) => {
    console.log(`Navigating to reservation for ${room}`);
    console.log(`Navigating to reserve ${room}`);
    navigate('/admin/create', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSULabs</strong> have five laboratories with <strong>32 slots</strong> that students can reserve in advance. Click on <strong>“Reserve a Slot”</strong> on the desired computer laboratory.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 301" onReserve={() => handleReserve("Gokongwei 301")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 302" onReserve={() => handleReserve("Gokongwei 302")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleReserve("Gokongwei 307A")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleReserve("Gokongwei 307B")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleReserve("Gokongwei 404A")} buttonText="Delete Reservation"/>
    </div>
  );
};

export default Create;