import RoomBar from '../HomeTabs/RoomBar';
import styles from './Delete.module.css';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
  const navigate = useNavigate();
  const handleDelete = (room: string) => {
    console.log(`Navigating to reservation for ${room}`);
    // You'll eventually use useNavigate() here
    console.log(`Navigating to reserve ${room}`);
    navigate('/admin/edit', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs technicians</strong> can delete lab reservations of students who fail to show up after 10 minutes after the reservation. Click Click on <strong>“Delete Reservation”</strong> to delete reservations of specified lab.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleDelete("307A")} buttonText="Delete Reservation" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleDelete("307B")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleDelete("404A")} buttonText="Delete Reservation"/>
    </div>
  );
};

export default Delete;