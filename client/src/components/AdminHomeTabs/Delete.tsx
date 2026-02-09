import RoomBar from '../HomeTabs/RoomBar';
import styles from './Delete.module.css';

const Delete = () => {
  const handleDelete = (room: string) => {
    console.log(`Navigating to reservation for ${room}`);
    // You'll eventually use useNavigate() here
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> allow lab technicians to edit student reservations. Click on <strong>“Edit Reservation”</strong> to make changes to current reservations.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleDelete("307A")} buttonText="Delete Reservation" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleDelete("307B")} buttonText="Delete Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleDelete("404A")} buttonText="Delete Reservation"/>
    </div>
  );
};

export default Delete;