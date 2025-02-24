import React, { useState } from 'react';
import './UserSidebar.css'; // Make sure to include the CSS file

const UserSidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // State to track which dropdown is active

  // Toggle dropdown menu
  const toggleDropdown = (dropdownName) => {
    // If the dropdown clicked is already active, close it; otherwise, open the clicked dropdown
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);


  };
  const username = sessionStorage.getItem("username");  // Get username from sessionStorage


  return (
    <div className="main-sidebar">
      {/* Admin Profile Section */}
      <div className="profile-section">
        <img
          src="data:image/png;base64,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"
          alt="Admin Avatar"
          className="profile-avatar"
         
        />
        <div className="profile-info">
          <h6>Hi, {username}</h6>

        </div>
      </div>

      {/* Sidebar Links */}
      <div className="sidebar">
      <a href="/userdashboardhome"><i className="fa fa-fw fa-home"></i> Home</a>

      {/* Services Dropdown */}
      <div className="dropdown-container">
        <a href="#services" onClick={() => toggleDropdown('services')} className="dropdown-btn">
          <i className="fa fa-fw fa-wrench"></i> Services
        </a>
        {activeDropdown === 'services' && ( // Check if 'services' dropdown is active
          <ul className="dropdown-content">
            <li><a href="/request">Request Services</a></li>
            <li><a href="/cancel"> Cancel Service </a></li>
            <li><a href="/viewmyrequest"> view my service </a></li>
          </ul>
        )}
      </div>

      {/* Clients Dropdown */}
      <div className="dropdown-container">
        <a href="#clients" onClick={() => toggleDropdown('clients')} className="dropdown-btn">
          <i className="fa fa-fw fa-user"></i> Clients
        </a>
        {activeDropdown === 'clients' && ( // Check if 'clients' dropdown is active
          <ul className="dropdown-content">
            <li><a href="/view">View Clients</a></li>
            <li><a href="/search">Search Clients</a></li>
            <li><a href="/updateuser">update Clients</a></li>
          </ul>
        )}
      </div>

      <div className="dropdown-container">
        <a href="#complaints" onClick={() => toggleDropdown('complaints')} className="dropdown-btn">
          <i className="fa fa-fw fa-user"></i> Complaints
        </a>
        {activeDropdown === 'complaints' && ( // Check if 'clients' dropdown is active
          <ul className="dropdown-content">
            <li><a href="/viewcomplaints">View complaints</a></li>
            <li><a href="/viewcomplaints">Add complaints</a></li>
          
          </ul>
        )}
      </div>

      <a href="#contact"><i className="fa fa-fw fa-envelope"></i> Contact</a>
    </div>
    </div>
  );
};

export default UserSidebar;
