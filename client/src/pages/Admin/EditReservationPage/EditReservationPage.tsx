import React, { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Board from '../../../components/Board/Board.tsx';
import styles from '../../../components/Board/Board.module.css';
import ReservationCard from '../../../components/AdminReservationCard/AdminReservationCard.tsx'
import "./EditReservationPage.css";

const EditReservation: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Select Filter');
  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem('adminEditEmail') || "";
  });
  
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    sessionStorage.setItem('adminEditEmail', email);
  }, [email]);

  useEffect(() => {
    if (email) {
      handleSearch();
    }
  }, []);

  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value)
  } 

  const handleSearch = async () => {
    if (!email) {
      alert("Please enter an email first.");
      return;
    }

    const username = email.split('@')[0];

    try {
      const userRes = await fetch(`/users/username/${encodeURIComponent(username)}`);
      
      if (!userRes.ok) {
        alert("Student not found.");
        setReservations([]);
        return;
      }
      
      const user = await userRes.json();

      const response = await fetch(`/users/${user._id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: { $in: ["active", "ongoing", "completed"] }
        })
      });
      
      if (!response.ok) {
        setReservations([]);
        return;
      }

      const userReservations = await response.json();
      
      const finalReservations = userReservations.map((reservation: any) => ({
        _id: reservation._id,
        username: username,
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

  const handleEditClick = (index: any) => {     
    navigate('/admin/edit-board', { state: { 
      originalReservation: reservations[index]  
    }});
  };

  const handleCancelClick = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`/reservations/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("✅ Reservation successfully deleted!");
          setReservations(prev => prev.filter(res => res.id !== id));
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
                          className="editButton"
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