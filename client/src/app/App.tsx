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
import ViewUserProfile from '../pages/Student/ViewUserProfilePage/ViewUserProfile.tsx';
import ProfileNavbar from '../components/Navbar/profilenavbar.tsx';
import Previous from '../components/HomeTabs/Previous.tsx';
import SlotReserve from '../pages/Student/SlotReserve/SlotReservePage.tsx'
import AdminSlotReserve from '../pages/Admin/SlotReserve/SlotReservePage.tsx'
import AdminEditBoardSelection from '../pages/Admin/EditBoardSelection/EditBoardSelection.tsx';
import EditBoardSelection from '../pages/Student/EditBoardSelection/EditBoardSelection.tsx';
import EditTimetable from '../pages/Student/EditTimeTable/EditTimeTable.tsx';
import AdminEditTimetable from '../pages/Admin/EditTimeTable/EditTimeTable.tsx';

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

        <Route path="/profile/:username" element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <ViewUserProfile />
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

        <Route path='/edit-board' element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <EditBoardSelection />
            </div> 
            <Footer />
          </div>
        } />

        <Route path='/edit-timetable' element={
          <div className="mainlayout">
            <Navbar />
            <div className="contentArea">
              <EditTimetable />
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

        <Route path="/admin/reserve" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminSlotReserve />
            </div>
          </div>
        } />

        <Route path="/admin/edit-board" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminEditBoardSelection />
            </div>
          </div>
        } />

        <Route path="/admin/edit-timetable" element={
          <div className="mainlayout">
            <AdminNavbar />
            <div className="contentArea">
              <AdminEditTimetable />
            </div>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;