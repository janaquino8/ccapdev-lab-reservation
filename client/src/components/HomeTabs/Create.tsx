import RoomBar from './RoomBar';
import styles from './Create.module.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const handleReserve = (room: string) => {
    console.log(`Navigating to reservation for ${room}`);
    // You'll eventually use useNavigate() here
    console.log(`Navigating to reserve ${room}`);
    navigate('/create', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> have five laboratories with <strong>32 slots</strong> that students can reserve in advance. Click on <strong>“Reserve a Slot”</strong> on the desired computer laboratory.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 301" onReserve={() => handleReserve("Gokongwei 301")} buttonText="Reserve a Slot"/>
      <RoomBar roomName="Gokongwei Room 302" onReserve={() => handleReserve("Gokongwei 302")} buttonText="Reserve a Slot"/>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleReserve("Gokongwei 307A")} buttonText="Reserve a Slot"/>
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleReserve("Gokongwei 307B")} buttonText="Reserve a Slot"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleReserve("Gokongwei 404A")} buttonText="Reserve a Slot"/>
    </div>
  );
};

export default Create;