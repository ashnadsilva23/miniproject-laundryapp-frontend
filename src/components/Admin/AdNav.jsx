import React from 'react';
// import './AdNav.css';
import { useNavigate } from 'react-router-dom';

const AdNav = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Remove token from localStorage or cookies
      localStorage.removeItem('token');  // If you stored it in localStorage
      document.cookie = 'token=; Max-Age=0'; // If you stored it in cookies

      // Redirect to login page or home page
      navigate('/');
    }
  };

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
      <a className="navbar-brand" href="/">Laundry Service</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default AdNav;
