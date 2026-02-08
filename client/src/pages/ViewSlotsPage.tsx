import Desk from '../components/Desk/Desk.tsx';

const ViewSlots = () => {
    
    const deskStyle = {
        display: 'flex' as const,
        flexWrap: 'wrap' as const, 
        gap: '20px',
        padding: '40px',
    }

    return (
        <>
            <div style={deskStyle}>
                <Desk 
                topSlots={[
                    { id: 'A1', status: 'available' },
                    { id: 'A2', status: 'reserved' }
                ]} 
                />

                <Desk 
                bottomSlots={[
                    { id: 'A7', status: 'unavailable' },
                    { id: 'A8', status: 'available' }
                ]}
                />

                <Desk 
                bottomSlots={[
                    { id: 'A7', status: 'unavailable' }
                ]}
                />
            </div>
        </>
    );
};

export default ViewSlots;