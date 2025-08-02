import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:3001/api/doctors/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDoctors(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error('Error fetching doctors:', err);
        if (err.response?.status === 403) {
          alert('Unauthorized access. Please login again.');
          navigate('/login');
        }
      });
  };

  const deleteDoctor = (id) => {
    const token = localStorage.getItem('token');

    axios
      .delete(`http://localhost:3001/api/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDoctors((prev) => prev.filter((d) => d.doctorId !== id));
      })
      .catch((err) => {
        console.error('Error deleting doctor:', err);
        if (err.response?.status === 403) {
          alert('Not authorized to delete doctor.');
        }
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = Array.isArray(doctors)
    ? doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Doctor Details</h2>
      <input
        type="text"
        placeholder="Search by doctor name"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Doctor ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Specialization</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.doctorId}>
              <td style={tdStyle}>{doctor.doctorId}</td>
              <td style={tdStyle}>{doctor.doctorName}</td>
              <td style={tdStyle}>{doctor.doctorEmail}</td>
              <td style={tdStyle}>{doctor.doctorSpecialization}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => deleteDoctor(doctor.doctorId)}
                  style={{
                    backgroundColor: '#ff4d4d',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '5px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = 0.8)}
                  onMouseOut={(e) => (e.target.style.opacity = 1)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredDoctors.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '15px' }}>
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ccc',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

export default AdminDashboard;
