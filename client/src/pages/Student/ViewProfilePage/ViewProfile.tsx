import React, { useEffect, useState } from "react";
import "./ViewProfile.css";
import blankPicture from "../../../assets/blank-dp.png";

interface UserProfile {
  givenName: string;
  lastName: string;
  username: string;
  description: string;
  profilePicture: string;
}

const ViewProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
              <button className="action-btn">Edit Profile</button>
              <button className="action-btn">Delete Account</button>
            </div>
          </div>

          <div className="details">
            <span className="label">View Profile</span>
            <h1 className="name">{user.givenName} {user.lastName}</h1>
            <p className="description">{user.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProfile;