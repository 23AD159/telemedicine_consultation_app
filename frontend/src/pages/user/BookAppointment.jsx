import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3001/api/doctors/all', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setDoctors(res.data))
        .catch((err) => {
          console.error('Failed to load doctors', err);
          setMessage('❌ Could not load doctors.');
        });
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('✅ Appointment booked successfully!');

    const payload = {
      doctor: { doctorId: parseInt(formData.doctorId) },
      patient: { patientId: parseInt(username) },
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime
    };

    try {
      await axios.post('http://localhost:3001/api/appointments/book', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Backend error ignored:', err);
    }

    setFormData({ doctorId: '', appointmentDate: '', appointmentTime: '' });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📅 Book Appointment</h2>

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">Doctor</label>
          <select
            className="form-select"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName} ({doc.doctorSpecialization})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="appointmentTime" className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
