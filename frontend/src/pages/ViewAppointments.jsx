import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('You must be logged in to view appointments.');
          setLoading(false);
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        const response = await axios.get('http://localhost:3001/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAppointments(response.data);
      } catch (err) {
        console.error('Axios Error:', err);
        if (err.response?.status === 403) {
          setError('Access denied. You are not authorized to view appointments.');
        } else if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('Failed to fetch appointments.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Your Appointments</h2>

        {loading && <div className="alert alert-info">Loading appointments...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && appointments.length === 0 && (
          <div className="alert alert-warning">No appointments found.</div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Appointment ID</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.appointment_id}>
                    <td>{appt.appointment_id}</td>
                    <td>{appt.doctor?.doctorName || 'N/A'}</td>
                    <td>{appt.patient?.patientName || 'N/A'}</td>
                    <td>{new Date(appt.appointmentDateTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAppointments;
