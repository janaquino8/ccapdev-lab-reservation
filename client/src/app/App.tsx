import { useState } from 'react'
import './App.css'
import './../components/navbar.tsx'
import Navbar from './../components/navbar.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
  
    </>
  )
}

export default App
