import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar.tsx'
import ViewSlots from '../pages/ViewSlotsPage.tsx'
import LoginPage from '../pages/LoginPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/slots" element={
          <>
            <Navbar /> 
            <ViewSlots />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;