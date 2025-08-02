// src/pages/doctor/PatientRecords.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      
      navigate('/login');
      return;
    }

    
    axios.get('http://localhost:3001/api/doctors/patients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setPatients(res.data))
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login'); 
        } else {
          setError('Failed to fetch patient records');
        }
        console.error(err);
      });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient Records</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Medical History</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>{patient.patientId}</td>
                <td>{patient.patientName}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.medicalHistory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecords;
