import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Doctor Dashboard</h2>
      <div className="row mt-4">
        {/* Upcoming Appointments Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Upcoming Appointments</h5>
              <p className="card-text">View your scheduled consultations.</p>
              <button 
                onClick={() => navigate('/doctor/view-appointments')} 
                className="btn btn-primary w-100"
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Patient Records Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Patient Records</h5>
              <p className="card-text">Access and manage patient details.</p>
              <button 
                onClick={() => navigate('/doctor/patient-records')} 
                className="btn btn-success w-100"
              >
                View Records
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Update your profile and availability.</p>
              <button 
                onClick={() => navigate('/doctor/profile')} 
                className="btn btn-warning w-100"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
