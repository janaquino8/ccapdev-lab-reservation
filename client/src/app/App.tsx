import './App.css'
import '../components/Navbar/navbar.tsx'
import Navbar from '../components/Navbar/navbar.tsx'
import Slot from '../components/Slot/Slot.tsx'

function App() {

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Slot id='A1' status='available'></Slot>
      </div>
    </>
  )
}

export default App
