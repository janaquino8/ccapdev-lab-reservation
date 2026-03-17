import React, { useEffect, useState } from "react";
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

const ViewProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editProfilePicture, setEditProfilePicture] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditDescription(parsedUser.description || "");
      setEditProfilePicture(parsedUser.profilePicture || "");
    }
  }, []);

  const handleSaveChanges = async () => {
    if (!user) return;
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editDescription,
          profilePicture: editProfilePicture
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Could not connect to the server.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditProfilePicture(reader.result as string); 
      };
      
      reader.readAsDataURL(file);
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
              <button className="action-btn delete-btn">Delete Account</button>
            </div>
          </div>

          <div className="details">
            <span className="label">View Profile</span>
            <h1 className="name">{user.givenName} {user.lastName}</h1>
            <p className="description">{user.description}</p>
          </div>
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
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;