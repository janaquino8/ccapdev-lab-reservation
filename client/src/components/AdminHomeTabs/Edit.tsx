import React, { useState, useEffect } from "react";
import styles from './Edit.module.css';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  // In a real app, this data would come from an API or State
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  
  useEffect(() => {
    fetchMyReservations();
  }, []);

  const fetchMyReservations = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        alert("You must be logged in to manage reservations.");
        navigate('/');
        return;
      }
      
      const user = JSON.parse(storedUser);

      const response = await fetch(`/reservations/active-ongoing?limit=3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        setReservations([]);
        return;
      }

      const userReservations = await response.json();
      console.log(userReservations)
          
        const finalReservations = userReservations.map((reservation: any) => ({
          _id: reservation._id,
          username: reservation.user.username || null,
          laboratory: reservation.laboratory.name,
          isAnonymous: reservation.isAnonymous,
          reservedSlots: reservation.reservedSlots.map((slotData: any) => ({
            slot: slotData.slot.name,
            timeStart: slotData.timeStart,
            timeEnd: slotData.timeEnd
          }))
        }));

      setReservations(finalReservations);
      console.log(finalReservations)

    } catch (error) {
      console.error("Error fetching reservations:", error);
      alert("Network error. Could not connect to the server.");
    }
  };

  const handleEdit = (id: number, room: string) => {
    console.log(`Redirecting to edit form for reservation ${id}`);
    navigate('/admin/edit');
  };

  return (
    <div>
      <p>
        <span className={styles.description}>
            <strong>DLSULabs</strong> allow students to view and edit their reservations. 
            Students can change slots, laboratories and time of reservation. 
            Click on <strong>“Edit Reservation”</strong> to edit a reservation,
            or <strong>"View Profile"</strong> to view your profile page, including your reservations.
        </span>
      </p>

      <div className={styles.editHeader}>
        <h2>
          Upcoming Reservations
        </h2>
      </div>

      <div className={styles.reservations}>
        {reservations.length === 0 ? (
          <p style={{display: 'flex', justifyContent: 'center', fontSize: '25px'}}>You have no active reservations. Create a reservation now!</p>
        ) : (
          <>
            {reservations.map((item, index) => (
              <div key={index} className={styles.reservationContainer}>
                <div className={styles.header}>
                  <h2 className={styles.entryLabel}>
                    {`${index + 1}. ${item.laboratory} | user: ${item.username}`}
                  </h2>
                </div>
                
                <div className={styles.reservationSlots}>
                  {
                  item.reservedSlots.map((slotItem: any, index2: number) => (
                    <div className={styles.reservationSlot} key={index2}>
                      <div className={styles.pill}>
                        {slotItem.slot}
                      </div>
                      <p>
                        {`${new Date(slotItem.timeStart).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}`}
                        &nbsp; | &nbsp; 
                        {`${new Date(slotItem.timeStart).toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "UTC"})}`}
                        &nbsp;-&nbsp;
                        {`${new Date(slotItem.timeEnd).toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "UTC"})}`}
                      </p>
                    </div>
                  ))
                  }
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => navigate('/admin/edit')}
        >
          Edit Reservation
        </button>
      </div>
    </div>
  );
};

export default Edit;