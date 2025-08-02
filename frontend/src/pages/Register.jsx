// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     userName: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     roleNames: []
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRoleChange = (e) => {
//     const role = e.target.value;
//     if (e.target.checked) {
//       setFormData(prev => ({
//         ...prev,
//         roleNames: [...prev.roleNames, role]
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         roleNames: prev.roleNames.filter(r => r !== role)
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await axios.post('http://localhost:3001/api/auth/register', formData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate('/login'), 1500);
//     } catch (err) {
//       console.error("Register error:", err);
//       setError(err.response?.data?.message || "Registration failed.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//       <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
//         <h2 className="text-center mb-4">Register</h2>

//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input type="text" name="userName" value={formData.userName} className="form-control" onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" name="password" value={formData.password} className="form-control" onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Phone</label>
//             <input type="text" name="phone" value={formData.phone} className="form-control" onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Address</label>
//             <input type="text" name="address" value={formData.address} className="form-control" onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Roles</label><br />
//             {['ADMIN', 'USER', 'DOCTOR'].map(role => (
//               <div className="form-check" key={role}>
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   value={role}
//                   id={role}
//                   onChange={handleRoleChange}
//                 />
//                 <label htmlFor={role} className="form-check-label">{role}</label>
//               </div>
//             ))}
//           </div>

//           <button type="submit" className="btn btn-dark w-100">Register</button>
//         </form>

//         <div className="text-center mt-3">
//           Already have an account? <Link to="/login">Login here</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    roleNames: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        roleNames: [...prev.roleNames, role]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        roleNames: prev.roleNames.filter(r => r !== role)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.roleNames.length === 0) {
      setError('Please select at least one role.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/register', formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Register</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="userName" value={formData.userName} className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" value={formData.phone} className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" value={formData.address} className="form-control" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Roles <span className="text-danger">*</span></label><br />
            {['ADMIN', 'USER', 'DOCTOR'].map(role => (
              <div className="form-check" key={role}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={role}
                  id={role}
                  onChange={handleRoleChange}
                />
                <label htmlFor={role} className="form-check-label">{role}</label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>
        </form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
