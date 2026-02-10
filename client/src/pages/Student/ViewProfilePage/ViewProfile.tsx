import React from "react";
import "./ViewProfile.css";
import johnPork from "../../../assets/john-pork.jpg"

const ViewProfile: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="banner-container">
      </div>

      <div className="layout">
        <div className="grid">

          <div className="sidebar">
            <div className="avatar">
              <img src={johnPork}></img>
            </div>
            <div className="buttons">
              <button className="action-btn">Edit Profile</button>
              <button className="action-btn">Delete Account</button>
            </div>
          </div>

          <div className="details">
            <span className="label">View Profile</span>
            <h1 className="name">John Pork</h1>
            <p className="description">Tim Cheese is my biggest opp.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
