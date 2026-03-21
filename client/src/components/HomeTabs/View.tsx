import { useNavigate } from 'react-router-dom';
import RoomBar from './RoomBar';
import styles from './View.module.css';

const View = () => {
    const navigate = useNavigate();

  const handleView = (room: string) => {
    console.log(`Navigating to view ${room}`);
    navigate('/view', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> have three laboratories with <strong>32 slots</strong> that students can reserve in advance. Click on <strong>“View Slots”</strong> on the desired computer laboratory.
        </span>
      </p>
      <RoomBar roomName="Gokongwei Room 307A" onReserve={() => handleView("Gokongwei 307A")} buttonText="View Laboratory" />
      <RoomBar roomName="Gokongwei Room 307B" onReserve={() => handleView("Gokongwei 307B")} buttonText="View Laboratory"/>
      <RoomBar roomName="Gokongwei Room 404A" onReserve={() => handleView("Gokongwei 404A")} buttonText="View Laboratory"/>
    </div>
  );
};

export default View;