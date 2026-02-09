import RoomBar from './RoomBar';
import styles from './Create.module.css';

const Create = () => {
  const handleReserve = (room: string) => {
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
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleReserve("307A")} buttonText="Reserve a Slot" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleReserve("307B")} buttonText="Reserve a Slot"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleReserve("404A")} buttonText="Reserve a Slot"/>
    </div>
  );
};

export default Create;