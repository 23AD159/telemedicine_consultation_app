import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);
      const { token, username, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", roles); 
      localStorage.setItem("username", username);

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          Don’t have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
