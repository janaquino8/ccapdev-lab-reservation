import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar.tsx'
import ViewSlots from '../pages/Student/ViewSlotsPage/ViewSlotsPage.tsx'
import LoginPage from '../pages/Student/LoginPage/LoginPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/slots" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewSlots />
            </div> 
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;