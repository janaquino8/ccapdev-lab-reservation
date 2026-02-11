import styles from './Previous.module.css';
import PreviousRow from './PreviousRow';
import { useNavigate } from 'react-router-dom';

const Previous = () => {
  // Example data based on your mockup headers
  const history = [
    { lab: "GK307A", name: "Dela Cruz", studentNo: "12345678", slot: "A2", timeStart: "12:45pm", timeEnd: "2:45pm" },
    { lab: "GK307B", name: "Ramos", studentNo: "87654321", slot: "B1", timeStart: "1:00pm", timeEnd: "3:00pm" },
    { lab: "GK307B", name: "Aquino", studentNo: "1241122", slot: "B3", timeStart: "6:00pm", timeEnd: "7:30pm" },
    { lab: "GK307A", name: "Fajardo", studentNo: "12456789", slot: "B4", timeStart: "2:00pm", timeEnd: "3:30pm" },
    { lab: "GK307A", name: "Maravilla", studentNo: "12498765", slot: "B6", timeStart: "1:00pm", timeEnd: "2:30pm" }
  ];

  const headers = { 
    lab: "Laboratory", 
    name: "Name", 
    studentNo: "Student No.", 
    slot: "Slot", 
    timeStart: "Time Start", 
    timeEnd: "Time End" 
  };

  const navigate = useNavigate();

  const handlePrevious = () => {
    console.log(`Redirecting to view all previous reservations`);
    navigate('/previous');
  };

  return (
    <div className={styles.previousWrapper}>
      <p className={styles.description}>
        <strong>DLSU Comp. Labs</strong> keep track of students’ previous reservations. 
        Here are your recent past reservations. All previous reservations can be viewed by clicking 
        <strong> “View All Previous Reservations”</strong>.
      </p>

      <div className={styles.tableContainer}>
        <PreviousRow data={headers} isHeader={true} />

        <div className={styles.rowsList}>
          {history.map((item, index) => (
            <PreviousRow key={index} data={item} />
          ))}
        </div>
        <button onClick={handlePrevious}>View All Previous Reservations</button>
      </div>

    </div>
  );
};

export default Previous;