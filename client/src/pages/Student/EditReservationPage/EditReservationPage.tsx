import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from '../../../components/Board/Board.tsx';
import ReservationCard from '../../../components/ReservationCard/ReservationCard.tsx'; 
import "./EditReservationPage.css";

const EditReservation: React.FC = () => {
  const navigate = useNavigate();
  const [realReservations, setRealReservations] = useState<any[]>([]);

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

      const resResponse = await fetch(`http://localhost:3000/users/${user._id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'active'
        }) 
      });
      
      if (!resResponse.ok) {
        setRealReservations([]);
        return;
      }

      const reservationsData = await resResponse.json();
      const formattedData: any[] = [];
      
      reservationsData.forEach((resDoc: any) => {
        resDoc.reservedSlots.forEach((slotData: any) => {
          const startDate = new Date(slotData.timeStart);
          const endDate = new Date(slotData.timeEnd);

          formattedData.push({
            id: resDoc._id,
            userId: user._id,
            email: user.email,    
            date: startDate.toLocaleDateString(),
            name: `${user.givenName} ${user.lastName}`, 
            laboratory: resDoc.laboratory?.name || "Unknown Lab",
            slot: slotData.slot?.name || "Unknown Slot",
            timeStart: startDate.toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "UTC"}),
            timeEnd: endDate.toLocaleTimeString("en-US", {timeStyle: "short", timeZone: "UTC"}),
          });
        });
      });

      setRealReservations(formattedData);

    } catch (error) {
      console.error("Error fetching reservations:", error);
      alert("Network error. Could not connect to the server.");
    }
  };

  const handleEditClick = (id: string) => { 
    const reservationToEdit = realReservations.find(res => res.id === id);
    navigate('/edit-board', { state: { targetReservation: reservationToEdit } });
  };

  return (
    <>
      <div className="pageContainer">
        <Board title="Edit My Reservations">
            <div className="description" style={{ marginBottom: '20px' }}>
                <p>Click "Edit" to modify your schedule, or "Cancel" to permanently delete a reservation.</p>
            </div>

          <div className="entries">
            <ReservationCard 
                type={"student"}
                entry="Your Active Reservations" 
                content={realReservations}
                onEdit={handleEditClick}
            /> 
          </div>
        </Board>
      </div>
    </>
  );
};

export default EditReservation;