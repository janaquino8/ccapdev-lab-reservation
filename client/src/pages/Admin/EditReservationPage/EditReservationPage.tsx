import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import ReservationCard from '../../../components/AdminReservationCard/AdminReservationCard.tsx'
import "./EditReservationPage.css";

const EditReservation: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Select Filter');
  const [email, setEmail] = useState("");
  
  const [realReservations, setRealReservations] = useState<any[]>([]);

  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value)
  } 

  const handleSearch = async () => {
    if (!email) {
      alert("Please enter an email first.");
      return;
    }

    try {
      const userRes = await fetch(`http://localhost:3000/users/email/${encodeURIComponent(email)}`);
      
      if (!userRes.ok) {
        alert("Student not found.");
        setRealReservations([]);
        return;
      }
      
      const user = await userRes.json();

      const resResponse = await fetch(`http://localhost:3000/users/${user._id}/reservations`);
      
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
            email: email,    
            date: startDate.toLocaleDateString(),
            name: `${user.givenName} ${user.lastName}`, 
            laboratory: resDoc.laboratory?.name || "Unknown Lab",
            slot: slotData.slot?.name || "Unknown Slot",
            timeStart: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timeEnd: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    
    navigate('/admin/edit-board', { state: { targetReservation: reservationToEdit } });
  };

  const handleCancelClick = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/reservations/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("✅ Reservation successfully deleted!");
          setRealReservations(prev => prev.filter(res => res.id !== id));
        } else {
          const errorData = await response.json();
          alert(`❌ Failed to delete: ${errorData.error || errorData.message}`);
        }
      } catch (err) {
        console.error("Error deleting reservation:", err);
        alert("Network error. Could not connect to the server.");
      }
    }
  };

  return (
    <>
      <div className="pageContainer">
        <Board title="Edit Reservations">
            <div className="description">
                <p>Input the student's email before clicking on the reservation you want to edit.</p>
            </div>
            
            <div className="emailContainer" style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label htmlFor="email">Student Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@dlsu.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="emailInput"
                  style={{ color: 'black' }} 
                />
              </div>
              <button 
                onClick={handleSearch}
                style={{
                  backgroundColor: '#E2E8DC', 
                  color: '#385E33', 
                  border: 'none', 
                  padding: '10px 16px', 
                  marginLeft: '10px',
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  height: '40px'
                }}
              >
                Search
              </button>
            </div>

          <div className="entries">
            <ReservationCard 
                type={"student"}
                entry="Previous Reservations" 
                content={realReservations}
                onEdit={handleEditClick}
                onCancel={handleCancelClick}
            /> 
          </div>
        </Board>
      </div>
    </>
  );
};

export default EditReservation;