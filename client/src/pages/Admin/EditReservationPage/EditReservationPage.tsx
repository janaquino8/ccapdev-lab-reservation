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
        }
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
        status: reservation.status,
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

  const handleStartClick = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to start this reservation?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`/reservations/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: "ongoing"
          })
        });

        if (response.ok) {
          alert("✅ Reservation successfully started! Reservation is ongoing!");
          handleSearch();
        } else {
          const errorData = await response.json();
          alert(`❌ Failed to start: ${errorData.error || errorData.message}`);
        }
      } catch (err) {
        console.error("Error starting reservation:", err);
        alert("Network error. Could not connect to the server.");
      }
    }
  };

  const handleEndClick = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to end this reservation?");
    
    if (isConfirmed) {
      try {
        const response = await fetch(`/reservations/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: "completed"
          })
        });

        if (response.ok) {
          alert("✅ Reservation successfully ended! Reservation is complete!");
          handleSearch();
        } else {
          const errorData = await response.json();
          alert(`❌ Failed to end: ${errorData.error || errorData.message}`);
        }
      } catch (err) {
        console.error("Error ending reservation:", err);
        alert("Network error. Could not connect to the server.");
      }
    }
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
          handleSearch();
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

  // const getDateObj = () => {
  //   const [ year, month, day ] = reserveInfo.date.split("-").map(item => Number(item));
  //   const [ hour, minute ] = reserveInfo.time.split(" - ")[0].replace(" AM", "").replace(" PM", "").split(":").map(item => Number(item))

  //   const now = new Date()
  //   return new Date(
  //     year, 
  //     month - 1, 
  //     day,
  //     hour + (reserveInfo.time[6] === 'P' && hour < 12 ? 12 : 0),
  //     minute
  //   )
  // }

  const isValidStart = (status: string, date: Date): boolean => {
    const now = new Date();
    date = new Date(date.getTime() - 1000 * 60 * 60 * 8);

    return status === "active" 
      && now.getTime() >= date.getTime() - (1000 * 60 * 5);
  }

  const isValidEnd = (status: string, date: Date): boolean => {
    const now = new Date();
    date = new Date(date.getTime() - 1000 * 60 * 60 * 8);

    return status === "ongoing" 
      && now.getTime() >= date.getTime();
  }

  const isValidCancel = (status: string, date: Date): boolean => {
    const now = new Date();
    date = new Date(date.getTime() - 1000 * 60 * 60 * 8);
    
    return ["active", "ongoing"].includes(status) 
      && now.getTime() >= date.getTime() + (1000 * 60 * 10);
  }

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
                <p style={{display: 'flex', justifyContent: 'center', fontSize: '25px'}}>No reservations found.</p>
              ) : (
                <>
                  <p>* indicates anonymous reservation</p>
                  {reservations.map((item, index) => (
                    <div key={index} className="reservationContainer">
                      <div className="header">
                        <h2 className="entry-label">
                          {`${index + 1}. ${item.isAnonymous ? "*" : ""}${item.laboratory} |`}
                        </h2>
                        <div className={`status-label ${item.status}`}>
                          <h2 className="entry-label">
                            {`${item.status.toUpperCase()}`}
                          </h2>
                        </div>
                        {item.status === "active" && <button
                          onClick={() => handleEditClick(index)}
                        >
                          EDIT
                        </button>}
                        {isValidStart(item.status, new Date(item.reservedSlots[0].timeStart)) && (
                          <button
                            onClick={() => handleStartClick(item._id)}
                          >
                            START RESERVE
                          </button>
                        )}
                        {isValidEnd(item.status, new Date(item.reservedSlots.at(-1).timeStart)) && (
                          <button
                            onClick={() => handleEndClick(item._id)}
                          >
                            END RESERVE
                          </button>
                        )}
                        {isValidCancel(item.status, new Date(item.reservedSlots[0].timeStart)) && (
                          <button
                            className="cancel"
                            onClick={() => handleCancelClick(item._id)}
                          >
                            CANCEL
                          </button>
                        )}
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