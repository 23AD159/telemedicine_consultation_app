import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    doctorName: '',
    doctorEmail: '',
    doctorSpecialization: '',
    experience: '',
    availableDays: [],
    availableTimes: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!username || !token) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:3001/api/doctors/by-username/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const doctor = res.data;
      setProfile({
        doctorName: doctor.doctorName || '',
        doctorEmail: doctor.doctorEmail || '',
        doctorSpecialization: doctor.doctorSpecialization || '',
        experience: doctor.experience !== null && doctor.experience !== undefined ? doctor.experience : '',
        availableDays: doctor.availableDays || [],
        availableTimes: doctor.availableTimes || []
      });
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile.");
    });
  }, [username, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    setProfile(prev => {
      const updatedDays = checked
        ? [...prev.availableDays, value]
        : prev.availableDays.filter(day => day !== value);
      return { ...prev, availableDays: updatedDays };
    });
  };

  const handleTimeChange = (e) => {
    const { value, checked } = e.target;
    setProfile(prev => {
      const updatedTimes = checked
        ? [...prev.availableTimes, value]
        : prev.availableTimes.filter(time => time !== value);
      return { ...prev, availableTimes: updatedTimes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put(`http://localhost:3001/api/doctors/update/${username}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      if (err.response && err.response.status === 403) {
        setError("Unauthorized. Please log in again.");
        localStorage.clear();
        navigate('/login');
      } else {
        setError("Error updating profile.");
      }
    }
  };

  const availableDayOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const availableTimeOptions = [
    "09:00 AM - 12:00 PM", "10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM", "5:00 PM - 7:00 PM"
  ];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Edit Profile</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="doctorName"
              className="form-control"
              value={profile.doctorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="doctorEmail"
              className="form-control"
              value={profile.doctorEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              name="doctorSpecialization"
              className="form-control"
              value={profile.doctorSpecialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Experience (years)</label>
            <input
              type="number"
              name="experience"
              className="form-control"
              value={profile.experience}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Available Days</label>
            <div className="form-check">
              {availableDayOptions.map(day => (
                <div key={day}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={day}
                    checked={profile.availableDays.includes(day)}
                    onChange={handleDayChange}
                  />
                  <label className="form-check-label">{day}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Available Times</label>
            <div className="form-check">
              {availableTimeOptions.map(time => (
                <div key={time}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={time}
                    checked={profile.availableTimes.includes(time)}
                    onChange={handleTimeChange}
                  />
                  <label className="form-check-label">{time}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-warning w-100">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
