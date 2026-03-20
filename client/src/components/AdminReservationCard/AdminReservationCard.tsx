import React from 'react';
import './AdminReservationCard.css';
import { useNavigate } from 'react-router-dom';

function getHeaders(type: string): any[] {
  switch (type) {
    case 'email': return [
      {id: 1, name: "Date"}, 
      {id: 2, name: "Name"}, 
      {id: 3, name: "Slot"}, 
      {id: 4, name: "Time Start"}, 
      {id: 5, name: "Time End"}, 
    ];
    case 'student': return [
      {id: 1, name: "Date"},
      {id: 2, name: "Laboratory"},
      {id: 3, name: "Slot"},
      {id: 4, name: "Time Start"},
      {id: 5, name: "Time End"},
    ];
    case 'user': return [

    ];
    default: return [
      {id: 1, name: "N/A"},
      {id: 2, name: "N/A"},
      {id: 3, name: "N/A"},
      {id: 4, name: "N/A"},
      {id: 5, name: "N/A"},
    ]
  }
}

interface ReservationData {
  id?: number | string;
  date?: string;
  name?: string;       
  laboratory?: string; 
  slot?: string;
  timeStart?: string;
  timeEnd?: string;
}

interface ReservationCardProps {
  type: string;
  entry: string;
  content: any[];
}

const ReservationCard: React.FC<ReservationCardProps> = ({ type, entry, content }) => {
  const headers = getHeaders(type);
  const navigate = useNavigate();

  return (
    <div className="green-board">
      {/* CARD TITLE */}
      <div className="header">
        {entry && <h2 className="entry-label">{entry}</h2>}
      </div>

      {/* HEADERS ROW */}
      <div className="grid-layout" style={{ marginBottom: '1rem' }}>
        {headers.map((item) => (
          <div key={item.id} className="header-pill">
            {item.name}
          </div>
        ))}
      </div>

      {/* CONTENT ROWS */}
      <div className="content-container">
        {content.map((row, index) => (
          <div key={row.id || index} className="grid-layout row clickable-row" onClick={() =>navigate('/admin/create')}>

            {/* 1. Date */}
            <div className="cell">{row.date}</div>

            {/* 2. Name or Laboratory (Dynamic based on type) */}
            <div className="cell">
               {type === 'laboratory' ? row.name : row.laboratory}
            </div>

            {/* 3. Slot */}
            <div className="cell">{row.slot}</div>

            {/* 4. Start */}
            <div className="cell">{row.timeStart}</div>

            {/* 5. End */}
            <div className="cell">{row.timeEnd}</div>

          </div>
        ))}

        {content.length === 0 && (
          <div className="empty-message">No reservations found for this room.</div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;