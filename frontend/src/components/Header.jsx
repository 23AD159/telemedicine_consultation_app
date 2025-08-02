import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
    <Link className="navbar-brand fw-bold" to="/">TeleMed</Link>
    <div className="navbar-nav ms-auto">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Signup</Link>
    </div>
  </nav>
);

export default Header;
