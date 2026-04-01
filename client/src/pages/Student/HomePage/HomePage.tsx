import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CreateReservation from '../../../components/HomeTabs/Create';
import EditReservation from '../../../components/HomeTabs/Edit';
import PreviousReservations from '../../../components/HomeTabs/Previous';
import ViewSlots from '../../../components/HomeTabs/View'; 

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('create');

  // Function to determine which component to show
  const renderTabContent = () => {
    switch (activeTab) {
      case 'create': return <CreateReservation />;
      case 'edit': return <EditReservation />;
      case 'previous': return <PreviousReservations />;
      case 'view': return <ViewSlots />;
      default: return <CreateReservation />;
    }
  };

  return (
    <div className="homeWrapper">
        <div className="welcomeSection">
            <h1>Welcome to <span className="underline">DLSULabs!</span></h1>
            <p>Archer-approved speed for your lab needs.</p>
        </div>

        <div className="greenBody">
            <div className="mainCard">
                <div className="tabContainer">
                    <button 
                    className={activeTab === 'create' ? 'tabActive' : 'tab'} 
                    onClick={() => setActiveTab('create')}
                    >
                    Create Reservation
                    </button>
                    <button 
                    className={activeTab === 'edit' ? 'tabActive' : 'tab'} 
                    onClick={() => setActiveTab('edit')}
                    >
                    Edit Reservation
                    </button>
                    <button 
                    className={activeTab === 'view' ? 'tabActive' : 'tab'} 
                    onClick={() => setActiveTab('view')}
                    >
                    View Slots
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

export default HomePage;