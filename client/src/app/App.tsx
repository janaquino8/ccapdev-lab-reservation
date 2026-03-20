import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar.tsx'
import AdminNavbar from '../components/AdminNavbar/adminnavbar.tsx'
import Footer from '../components/Footer/Footer.tsx'
import LoginPage from '../pages/Student/LoginPage/LoginPage.tsx'
import RegisterPage from '../pages/Student/RegisterPage/RegisterPage.tsx'
import HomePage from '../pages/Student/HomePage/HomePage.tsx'
import CreateReservationPage from '../pages/Student/CreateReservationPage/CreateReservationPage.tsx'
import EditReservationPage from '../pages/Student/EditReservationPage/EditReservationPage.tsx'
import ViewSlotsPage from '../pages/Student/ViewSlotsPage/ViewSlotsPage.tsx'
import AdminHomePage from '../pages/Admin/AdminHome/AdminHomePage.tsx'
import AdminCreateReservationPage from '../pages/Admin/CreateReservationPage/CreateReservationPage.tsx';
import AdminEditReservationPage from '../pages/Admin/EditReservationPage/EditReservationPage.tsx';
import DeleteReservation from '../pages/Admin/DeleteReservationPage/DeleteReservationPage.tsx';
import ViewProfile from '../pages/Student/ViewProfilePage/ViewProfile.tsx';
import ProfileNavbar from '../components/Navbar/profilenavbar.tsx';
import Previous from '../components/HomeTabs/Previous.tsx';
import SearchPage from '../pages/Student/Search/SearchPage.tsx';
import SlotReserve from '../pages/Student/SlotReserve/SlotReservePage.tsx'
import AdminSlotReserve from '../pages/Admin/SlotReserve/SlotReservePage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Student routes */}
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

        <Route path="/create" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <CreateReservationPage />
            </div> 
          </div>
        } />

        <Route path="/edit" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <EditReservationPage />
            </div> 
          </div>
        } />

        <Route path="/view" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewSlotsPage />
            </div> 
          </div>
        } />

        <Route path="/viewprofile" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewProfile />
            </div> 
          </div>
        } />

        <Route path="/profile/:id" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewProfile />
            </div> 
          </div>
        } />

        <Route path="/search" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <SearchPage />
            </div> 
          </div>
        } />

        <Route path='/reserve' element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <SlotReserve />
            </div> 
            <Footer />
          </div>
        } />

        {/* Admin routes */}

        <Route path="/admin/home" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminHomePage />
            </div>
            <Footer />
          </div>
        } />

        <Route path="/admin/create" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminCreateReservationPage />
            </div> 
          </div>
        } />

        <Route path="/admin/edit" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminEditReservationPage />
            </div> 
          </div>
        } />

        <Route path="/admin/delete" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <DeleteReservation />
            </div>
          </div>

        } />

        <Route path="/admin/reserve" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminSlotReserve />
            </div>
          </div>

        } />
      </Routes>
    </Router>
  );
}

export default App;