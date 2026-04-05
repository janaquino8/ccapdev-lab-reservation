import EditRoomBar from './EditRoomBar';
import styles from './Edit.module.css';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  // In a real app, this data would come from an API or State
  const navigate = useNavigate();

  const reservations = [
    {
      id: 1,
      room: "Gokongwei Room 307A",
      studentId: "12345678",
      slot: "Row A Column 2",
      start: "12:45pm",
      end: "2:45pm"
    }
  ];

  const handleEdit = (id: number, room: string) => {
    console.log(`Redirecting to edit form for reservation ${id}`);
    navigate('/edit', { state: { laboratory: room } });
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> allow students to view and edit their reservations. 
            Students can change slots, laboratories and time of reservation. 
            Click on <strong>“Edit Reservation”</strong> to make changes to your reservation.
        </span>
      </p>

      <div>
        Upcoming reservations:
      </div>

      {reservations.map((res) => (
        <EditRoomBar 
          key={res.id}
          roomName={res.room}
          studentId={res.studentId}
          slot={res.slot}
          timeStart={res.start}
          timeEnd={res.end}
          onEdit={() => handleEdit(res.id, res.room)}
        />
      ))}
    </div>
  );
};

export default Edit;