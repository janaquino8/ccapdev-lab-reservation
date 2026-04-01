import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./ViewUserProfile.css";
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
  reservedSlots: [UserSlot];
}

const ViewUserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reservations, setReservations] = useState<[UserReservation] | []>([]);
  const [error, setError] = useState("");
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return; 

      try {
        const response = await fetch(`http://localhost:3000/users/username/${username}`, {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const parsedUser = await response.json();
          setUser(parsedUser);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      }
    }

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    if (!user) return; 

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}/reservations`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isAnonymous: false,
            status: "active"
          })
      });

      if (response.ok) {
          const userReservations = await response.json();
          
          const finalReservations = userReservations.map((reservation: any) => ({
            laboratory: reservation.laboratory.name,
            reservedSlots: reservation.reservedSlots.map((slotData: any) => ({
              slot: slotData.slot.name,
              timeStart: slotData.timeStart,
              timeEnd: slotData.timeEnd
            }))
          }));

          setReservations(finalReservations);

      } else {
          setReservations([]);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server to fetch reservations.");
    }
  }

  if (error) {
    return <div className="profile-page"><h2 style={{ color: 'red' }}>{error}</h2></div>;
  }

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
              <img src={user.profilePicture || blankPicture} alt={`${user.givenName}'s Profile`} />
            </div>
          </div>

          <div className="details">
            <h1 className="name">{user.givenName} {user.lastName}</h1>
            <p className="description">{user.description}</p>
          </div>
        </div>

        <div className="reservations">
          <h1>{user.givenName}'s Current Reservations</h1>
          {reservations.length === 0 ? (
            <p>{user.givenName} has no current reservations.</p>
          ) : (
            reservations.map((item, index) => (
              <div key={index}>
                <div className="header">
                  <h2 className="entry-label">
                    {`${index + 1}. ${item.laboratory}`}
                  </h2>
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
    </div>
  );
};

export default ViewUserProfile;