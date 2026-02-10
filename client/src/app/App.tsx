import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar.tsx'
import Footer from '../components/Footer/Footer.tsx'
import ViewSlots from '../pages/Student/ViewSlotsPage/ViewSlotsPage.tsx'
import LoginPage from '../pages/Student/LoginPage/LoginPage.tsx'
import HomePage from '../pages/Student/HomePage/HomePage.tsx'
import RegisterPage from '../pages/Student/RegisterPage/RegisterPage.tsx'
import AdminHomePage from '../pages/Admin/AdminHome/AdminHomePage.tsx'
import AdminNavbar from '../components/AdminNavbar/adminnavbar.tsx'
import DeleteReservation from '../pages/Student/DeleteReservationPage/DeleteReservationPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/home" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <HomePage />
            </div>
            <Footer />
          </div>
        } />

        <Route path="/adminhome" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminHomePage />
            </div>
            <Footer />
          </div>
        } />
        
        <Route path="/view" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewSlots />
            </div> 
          </div>
        } />

          <Route path="/delete" element={
            <div className="mainlayout">
              <AdminNavbar />
              <div className="contentArea">
                <DeleteReservation />
              </div>
            </div>

          } />
      </Routes>
    </Router>
  );
}

export default App;