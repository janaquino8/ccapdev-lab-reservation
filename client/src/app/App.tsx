import './App.css'
import '../components/Navbar/navbar.tsx'
import Navbar from '../components/Navbar/navbar.tsx'
import Slot from '../components/Slot/Slot.tsx'
import Desk from '../components/Desk/Desk.tsx';

function App() {

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '40px' }}>
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
      </div>
    </>
  )
}

export default App
