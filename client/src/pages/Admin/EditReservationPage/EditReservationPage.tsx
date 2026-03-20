import React, { useState, type ChangeEvent } from "react";
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import ReservationCard from '../../../components/AdminReservationCard/AdminReservationCard.tsx'
import "./EditReservationPage.css";

const CreateReservation: React.FC = () => {
  const [filter, setFilter] = useState('Select Filter');
  const [email, setEmail] = useState("");

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
        <Board title="Edit Reservations">
            <div className="descrption">
                <p>Input the student's email before clicking on the reservation you want to edit.</p>
            </div>
            <div className="emailContainer">
          <label htmlFor="email">Student Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="emailInput"
          />
        </div>
            {/*change the conditions here para lumabas yung reservations ng curr user*/}
          <div className="entries">
            <ReservationCard type={"email"} entry="Previous Reservations" content={DUMMY_RESERVATIONS} /> 
          </div>
        </Board>
      </div>
    </>
  );
};

export default CreateReservation;