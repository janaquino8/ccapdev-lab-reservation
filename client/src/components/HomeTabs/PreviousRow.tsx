import styles from './PreviousRow.module.css';

interface ReservationData {
  lab: string;
  name: string;
  studentNo: string;
  slot: string;
  timeStart: string;
  timeEnd: string;
  isHeader?: boolean; // We can reuse the same component for the header
}

const PreviousRow = ({ data, isHeader = false }: { data: ReservationData, isHeader?: boolean }) => {
  return (
    <div className={isHeader ? styles.headerContainer : styles.rowContainer}>
      <div className={styles.cell}>{data.lab}</div>
      <div className={styles.cell}>{data.name}</div>
      <div className={styles.cell}>{data.studentNo}</div>
      <div className={styles.cell}>{data.slot}</div>
      <div className={styles.cell}>{data.timeStart}</div>
      <div className={styles.cell}>{data.timeEnd}</div>
    </div>
  );
};

export default PreviousRow;