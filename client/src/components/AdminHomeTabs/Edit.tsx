import RoomBar from '../HomeTabs/RoomBar';
import styles from './Edit.module.css';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const handleEdit = (room: string) => {
    console.log(`Navigating to reservation for ${room}`);
    // You'll eventually use useNavigate() here
    console.log(`Navigating to reserve ${room}`);
    navigate('/admin/edit', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> allow lab technicians to edit student reservations. Click on <strong>“Edit Reservation”</strong> to make changes to current reservations.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleEdit("307A")} buttonText="Edit Reservation" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleEdit("307B")} buttonText="Edit Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleEdit("404A")} buttonText="Edit Reservation"/>
    </div>
  );
};

export default Edit;