import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import UserDashboard from './pages/user/PatientDashboard.jsx';
import BookAppointment from './pages/user/BookAppointment.jsx';
import ViewAppointments from './pages/ViewAppointments.jsx';
import PatientRecords from './pages/doctor/PatientRecords.jsx';
import EditProfile from './pages/doctor/EditProfile.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* Full height container */}
      <div className="d-flex flex-column min-vh-100 w-100">
        <Header />
        <main className="container-fluid flex-grow-1 py-4 px-3">
          <Routes>

            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route
              path="/admin/AdminDashboard"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor/DoctorDashboard"
              element={
                <ProtectedRoute role="DOCTOR">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/view-appointments"
              element={
                <ProtectedRoute role="DOCTOR">
                  <ViewAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/patient-records"
              element={
                <ProtectedRoute role="DOCTOR">
                  <PatientRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile"
              element={
                <ProtectedRoute role="DOCTOR">
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            {/* Patient Routes */}
            <Route
              path="/user/PatientDashboard"
              element={
                <ProtectedRoute role="PATIENT">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/BookAppointment"
              element={
                <ProtectedRoute role="PATIENT">
                  <BookAppointment />
                </ProtectedRoute>
              }
            />

              <Route
              path="/doctor/view-appointments"
              element={
                <ProtectedRoute role="PATIENT">
                  <ViewAppointments />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
