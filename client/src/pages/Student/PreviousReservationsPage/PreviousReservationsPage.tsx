import React, { useState, type ChangeEvent } from "react";
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import ReservationCard from '../../../components/ReservationCard/ReservationCard.tsx'
import "./PreviousReservationsPage.css";

const CreateReservation: React.FC = () => {
  const [filter, setFilter] = useState('Select Filter')

  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value)
  } 

  // AI-GENERATED DUMMY DATA
  const DUMMY_RESERVATIONS = [
  {
    id: 1,
    date: "2023-10-25",
    name: "Juan Dela Cruz",        // Displayed if type="laboratory"
    laboratory: "Gokongwei 307A",  // Displayed if type="student"
    slot: "Slot 1",
    timeStart: "09:00 AM",
    timeEnd: "10:30 AM",
  },
  {
    id: 2,
    date: "2023-10-26",
    name: "Maria Clara",
    laboratory: "Gokongwei 307B",
    slot: "Slot 3",
    timeStart: "01:00 PM",
    timeEnd: "02:30 PM",
  },
  {
    id: 3,
    date: "2023-10-27",
    name: "Jose Rizal",
    laboratory: "Velasco 202",
    slot: "Slot 2",
    timeStart: "10:30 AM",
    timeEnd: "12:00 PM",
  },
  {
    id: 4,
    date: "2023-10-28",
    name: "Antonio Luna",
    laboratory: "Gokongwei 307A",
    slot: "Slot 5",
    timeStart: "04:00 PM",
    timeEnd: "05:30 PM",
  },
  {
    id: 5,
    date: "2023-10-29",
    name: "Gabriela Silang",
    laboratory: "Andrew 901",
    slot: "Slot 1",
    timeStart: "07:30 AM",
    timeEnd: "09:00 AM",
  },
];

  return (
    <>
      <div className="pageContainer">
        <Board title="Previous Reservations">
          <div className="InputGroup">
            <label>Filtered by:</label>
            <select id="filter" value={filter} onChange={handleFilter}>
              <option value="">Select Filter</option>
              <option value="laboratory">Laboratory</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="entries">
            <ReservationCard type={filter} entry="Entry" content={DUMMY_RESERVATIONS} />
            <ReservationCard type={filter} entry="Entry2" content={DUMMY_RESERVATIONS} />
          </div>
        </Board>
      </div>
    </>
  );
};

export default CreateReservation;