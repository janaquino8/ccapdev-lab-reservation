import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from '../../../components/Board/Board.tsx';
import ReservationCard from '../../../components/ReservationCard/ReservationCard.tsx'; 
import "./EditReservationPage.css";

const EditReservation: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const fetchMyReservations = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        alert("You must be logged in to view your reservations.");
        navigate('/');
        return;
      }
      
      const user = JSON.parse(storedUser);

      const response = await fetch(`/users/${user._id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'active'
        }) 
      });
      
      if (!response.ok) {
        setReservations([]);
        return;
      }

      const userReservations = await response.json();
      console.log(userReservations)
          
        const finalReservations = userReservations.map((reservation: any) => ({
          _id: reservation._id,
          laboratory: reservation.laboratory.name,
          isAnonymous: reservation.isAnonymous,
          reservedSlots: reservation.reservedSlots.map((slotData: any) => ({
            slot: slotData.slot.name,
            timeStart: slotData.timeStart,
            timeEnd: slotData.timeEnd
          }))
        }));

        setReservations(finalReservations);

    } catch (error) {
      console.error("Error fetching reservations:", error);
      alert("Network error. Could not connect to the server.");
    }
  };

  const handleEditClick = (index: any) => { 
    navigate('/edit-board', { state: { 
      originalReservation: reservations[index] 
    }});
  };

  return (
    <>
      <div className="pageContainer">
        <Board title="Edit Reservations">
          <p>Click "EDIT" to continue</p>
          <div className="reservations">
            {reservations.length === 0 ? (
              <p style={{display: 'flex', justifyContent: 'center', fontSize: '25px'}}>You have no active reservations. Create a reservation now!</p>
            ) : (
              <>
                {reservations.map((item, index) => (
                  <div key={index} className="reservationContainer">
                    <div className="header">
                      <h2 className="entry-label">
                        {`${index + 1}. ${item.laboratory}`}
                      </h2>
                      <button
                        onClick={() => handleEditClick(index)}
                      >
                        EDIT
                      </button>
                    </div>
                    
                    <div className="reservationSlots">
                      {
                      item.reservedSlots.map((slotItem: any, index2: number) => (
                        <div className="reservationSlot" key={index2}>
                          <div className="pill">
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
        </Board>
      </div>
    </>
  );
};

export default EditReservation;