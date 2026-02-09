import styles from './Previous.module.css';
import PreviousRow from './PreviousRow';

const Previous = () => {
  // Example data based on your mockup headers
  const history = [
    { lab: "GK307A", name: "Dela Cruz", studentNo: "12345678", slot: "A2", timeStart: "12:45pm", timeEnd: "2:45pm" },
    { lab: "GK307B", name: "Santiago", studentNo: "87654321", slot: "B1", timeStart: "1:00pm", timeEnd: "3:00pm" }
  ];

  const headers = { 
    lab: "Laboratory", 
    name: "Name", 
    studentNo: "Student No.", 
    slot: "Slot", 
    timeStart: "Time Start", 
    timeEnd: "Time End" 
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
      </div>
    </div>
  );
};

export default Previous;