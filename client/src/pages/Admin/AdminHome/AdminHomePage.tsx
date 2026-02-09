import './AdminHomePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import EditReservation from '../../../components/AdminHomeTabs/Edit';
import DeleteReservation from '../../../components/AdminHomeTabs/Delete';

const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState('create');

  // Function to determine which component to show
  const renderTabContent = () => {
    switch (activeTab) {
      case 'edit': return <EditReservation />;
      case 'delete': return <DeleteReservation />;
      default: return <EditReservation />;
    }
  };

  return (
    <div className="homeWrapper">
        <div className="welcomeSection">
            <h1>Welcome to DLSU - Admin</h1><br />
            <h1><span className="underline">Computer Laboratories</span></h1>
            <p>Basta witty tagline</p>
        </div>

        <div className="greenBody">
            <div className="mainCard">
                <div className="tabContainer">
                    <button 
                    className={activeTab === 'edit' ? 'tabActive' : 'tab'} 
                    onClick={() => setActiveTab('edit')}
                    >
                    Edit Reservation
                    </button>
                    <button 
                    className={activeTab === 'delete' ? 'tabActive' : 'tab'} 
                    onClick={() => setActiveTab('delete')}
                    >
                    Delete Reservation
                    </button>
                </div>

                    <div className="cardContent">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default AdminHomePage;