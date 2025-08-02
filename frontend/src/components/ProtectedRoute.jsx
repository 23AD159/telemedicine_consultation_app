// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;

  if (role && userRole?.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
