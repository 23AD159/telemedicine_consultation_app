import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient Dashboard</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Book a New Appointment</h5>
            <p>Find and book a slot with a doctor.</p>
            <Link to="/user/BookAppointment" className="btn btn-primary">Book Appointment</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
