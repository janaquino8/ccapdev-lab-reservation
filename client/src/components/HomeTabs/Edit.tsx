import EditRoomBar from './EditRoomBar';
import styles from './Edit.module.css';

const Edit = () => {
  // In a real app, this data would come from an API or State
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

  const handleEdit = (id: number) => {
    console.log(`Redirecting to edit form for reservation ${id}`);
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSU Comp. Labs</strong> allow students to edit their recent reservation. 
            Students can change slots, laboratories and time of reservation. 
            Click on <strong>“Edit Reservation”</strong> to make changes to your reservation.
        </span>
      </p>

      {reservations.map((res) => (
        <EditRoomBar 
          key={res.id}
          roomName={res.room}
          studentId={res.studentId}
          slot={res.slot}
          timeStart={res.start}
          timeEnd={res.end}
          onEdit={() => handleEdit(res.id)}
        />
      ))}
    </div>
  );
};

export default Edit;