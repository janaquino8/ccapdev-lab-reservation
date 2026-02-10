import RoomBar from '../HomeTabs/RoomBar';
import styles from './Edit.module.css';

const Edit = () => {
  const handleEdit = (room: string) => {
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
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleEdit("307A")} buttonText="Edit Reservation" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleEdit("307B")} buttonText="Edit Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleEdit("404A")} buttonText="Edit Reservation"/>
    </div>
  );
};

export default Edit;