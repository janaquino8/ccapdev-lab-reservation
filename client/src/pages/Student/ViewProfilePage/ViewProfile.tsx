import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewProfile.css";
import blankPicture from "../../../assets/blank-dp.png";

interface UserProfile {
  _id: string;
  givenName: string;
  lastName: string;
  username: string;
  description: string;
  profilePicture: string;
}

interface UserSlot {
  slot: string;
  timeStart: Date;
  timeEnd: Date;
}

interface UserReservation {
  laboratory: string;
  status: string;
  reservedSlots: [UserSlot];
}

const ViewProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reservations, setReservations] = useState<[UserReservation] | []>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [editProfilePicture, setEditProfilePicture] = useState("");
  const [originalProfilePicture, setOriginalProfilePicture] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      setUser(parsedUser);
      setEditDescription(parsedUser.description || "");
      setOriginalDescription(parsedUser.description || "");
      setEditProfilePicture(parsedUser.profilePicture || "");
      setOriginalProfilePicture(parsedUser.profilePicture || "");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/users/${user._id}/reservations`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
      });

      if (response.ok) {
          const userReservations = await response.json();
          console.log(userReservations)
          const finalReservations = userReservations.map((reservation: any) => ({
            laboratory: reservation.laboratory.name,
            status: reservation.status,
            reservedSlots: reservation.reservedSlots.map((slotData: any) => ({
              slot: slotData.slot.name,
              timeStart: slotData.timeStart,
              timeEnd: slotData.timeEnd
            }))
          }));

          setReservations(finalReservations);
          console.log(finalReservations);
      } else {
          return setReservations([]);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server.");
    }
  }

  const handleSaveChanges = async () => {
    if (!user) return;
    setError("");

    if (!editDescription || !editProfilePicture) {
      setError("Insufficient update fields provided.");
      return;
    }

    try {
      const response = await fetch(`/users/${user._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          description: editDescription,
          profilePicture: editProfilePicture
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userProfileUpdated'));
        setIsEditing(false);
        setOriginalDescription(editDescription);
        setOriginalProfilePicture(editProfilePicture)
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Could not connect to the server.");
    }
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    setEditProfilePicture(originalProfilePicture);
    setEditDescription(originalDescription);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (!file?.type.includes("image")) {
      setError("Invalid file type.");
      return;
    }
    
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditProfilePicture(reader.result as string); 
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure? This will cancel all your active reservations.");
    if (!confirmDelete || !user) return;

    try {
      const response = await fetch(`/users/${user._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('user');
        alert("Account deleted successfully.");
        navigate('/');
      } else {
        setError("Failed to delete account.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to server.");
    }
  };

  if (!user) {
    return <div className="profile-page"><h2>Loading profile...</h2></div>;
  }

  return (
    <div className="profile-page">
      <div className="banner-container">
      </div>

      <div className="layout">
        <div className="grid">
          <div className="sidebar">
            <div className="avatar">
              <img src={user.profilePicture || blankPicture} alt="Profile" />
            </div>
            
            <div className="buttons">
              <button className="action-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button className="action-btn-delete" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>

          <div className="details">
            <h1 className="name">{user.givenName} {user.lastName}</h1>
            <p className="description">{user.description}</p>
          </div>
        </div>

        <div className="reservations">
          <h1>Reservation History</h1>
          {reservations.length === 0 ? (
            <p>You have not made a reservation. Book now!</p>
          ) : (
            reservations.map((item, index) => (
              <div key={index}>
                <div className="header">
                  <h2 className="entry-label">
                    {`${index + 1}. ${item.laboratory} |`}
                  </h2>
                  <div className={`status-label ${item.status}`}>
                    <h2 className="entry-label">
                      {`${item.status.toUpperCase()}`}
                    </h2>
                  </div>
                </div>
                
                <div className="reservationSlots">
                  {item.reservedSlots.map((slotItem, index2) => (
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
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

            <div className="input-group">
              <label><strong>Profile Picture:</strong></label>

              {editProfilePicture && (
                <img 
                  src={editProfilePicture} 
                  alt="Preview" 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} 
                />
              )}

              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload} 
              />
            </div>
            
            <div className="input-group">
              <label><strong>Description:</strong></label>
              <textarea 
                value={editDescription} 
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveChanges}>Save</button>
              <button className="cancel-btn" onClick={handleCancelChanges}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;