import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      navigate('/login');
      return;
    }

    switch (role.toUpperCase()) {
      case 'PATIENT':
        navigate('/user/PatientDashboard');
        break;
      case 'DOCTOR':
        navigate('/doctor/DoctorDashboard');
        break;
      case 'ADMIN':
        navigate('/admin/AdminDashboard');
        break;
      default:
        navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h4>Redirecting to your dashboard...</h4>
    </div>
  );
};

export default Home;
