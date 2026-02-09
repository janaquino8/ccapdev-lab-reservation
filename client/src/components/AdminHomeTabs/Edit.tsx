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
            <strong>DLSU Comp. Labs</strong> have three laboratories with <strong>32 slots</strong> that students can reserve in advance. Click on <strong>“Reserve a Slot”</strong> on the desired computer laboratory.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleEdit("307A")} buttonText="Edit Reservation" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleEdit("307B")} buttonText="Edit Reservation"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleEdit("404A")} buttonText="Edit Reservation"/>
    </div>
  );
};

export default Edit;