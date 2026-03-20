import React from 'react';
import './ReservationCard.css';
import { useNavigate } from 'react-router-dom';

function getHeaders(type: string): any[] {
  switch (type) {
    case 'laboratory': return [
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
    default: return [
      {id: 1, name: "Date"},
      {id: 2, name: "Laboratory"},
      {id: 3, name: "Slot"},
      {id: 4, name: "Start"},
      {id: 5, name: "End"},
    ]
  }
}

interface ReservationCardProps {
  type: string;
  entry: string;
  content: any[];
  onEdit?: (id: any) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ type, entry, content, onEdit }) => {
  const headers = getHeaders(type);
  const navigate = useNavigate();

  const hasActions = !!onEdit;
  if (hasActions && headers.length > 0 && !headers.find(h => h.name === "Actions")) {
    headers.push({ id: 6, name: "Actions" });
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
    alignItems: 'center'
  };

  return (
    <div className="green-board">
      <div className="header">
        {entry && <h2 className="entry-label">{entry}</h2>}
      </div>

      {/* HEADERS ROW */}
      <div className="grid-layout" style={{ ...gridStyle, marginBottom: '1rem' }}>
        {headers.map((item) => (
          <div key={item.id} className="header-pill">
            {item.name}
          </div>
        ))}
      </div>

      {/* CONTENT ROWS */}
      <div className="content-container">
        {content.map((row, index) => (
          <div key={row.id || index} className="grid-layout row" style={gridStyle}>
            
            <div className="cell">{row.date}</div>

            <div className="cell">
               {type === 'laboratory' ? row.name : row.laboratory}
            </div>

            <div className="cell">{row.slot}</div>
            <div className="cell">{row.timeStart}</div>
            <div className="cell">{row.timeEnd}</div>

            {hasActions && (
              <div className="cell action-buttons" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {onEdit && (
                  <button 
                    onClick={() => onEdit(row.id)}
                    style={{ 
                      backgroundColor: '#e2e8dc',
                      color: '#385E33', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontWeight: '600',
                      fontFamily: "'Bricolage Grotesque', sans-serif"
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {content.length === 0 && (
          <div className="empty-message">No reservations found.</div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;