import React from "react";
import "./ViewProfile.css";

const ViewProfile: React.FC = () => {
  return (
    <div>
      <div className="nav-bar">
        <p>temp nav bar</p>
      </div>

      <div className="bg-pic">
        <img src="yellow_cover.jpg" alt="Background Picture" />
      </div>

      <div className="content">
        <div className="profile">
          <div className="profile-pic">
            <img src="john pork.jpg" alt="Profile Picture" />

            <div className="customize">
              <button className="edit-profile-btn">Edit Profile</button>
              <button className="delete-acc-btn">Delete Account</button>
            </div>
          </div>

          <div className="profile-text">
            <h1 className="view-profile">View Profile</h1>
            <h1 className="name">John Pork</h1>
            <h1 className="description">
              Tim Cheese is my biggest opp.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
