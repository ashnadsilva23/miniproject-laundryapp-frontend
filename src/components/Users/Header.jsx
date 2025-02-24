import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-links">
          <ul>
            <li><a href="/userdashboard">Home</a></li>
            <li><a href="/viewmycomplaints">View My Complaints</a></li>
            <li><a href="/viewmyrequests">View my Requests</a></li>
           
          </ul>
        </nav>
        
      </div>

      <style>
        {`
        .header {
          background-color: #4A90E2; /* A nice blue color */
          color: white; /* Text color */
          padding: 15px; /* Padding for the header */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
          width: 100%; /* Full width */
          position: relative; /* Positioning context */
        }

        .header-container {
          display: flex; /* Use flexbox for alignment */
          justify-content: space-between; /* Space between elements */
          align-items: center; /* Center items vertically */
          margin: 0 auto; /* Center the header content */
          padding: 0 20px; /* Optional padding for the header content */
          width: 100%; /* Full width of the container */
        }

        .logo {
          font-size: 1.5em; /* Logo font size */
          font-weight: bold; /* Bold text */
        }

        .nav-links ul {
          list-style: none; /* Remove bullet points */
          display: flex; /* Display links in a row */
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
        }

        .nav-links li {
          margin: 0 15px; /* Space between links */
        }

        .nav-links a {
          color: white; /* Link color */
          text-decoration: none; /* Remove underline */
          font-size: 1em; /* Font size for links */
          transition: color 0.3s; /* Smooth transition for hover effect */
        }

        .nav-links a:hover {
          color: #FFD700; /* Change color on hover */
        }

        .user-info {
          font-size: 1.2em; /* Font size for user info */
          font-weight: bold; /* Bold text */
        }

        .user-info span {
          padding: 10px; /* Add some padding around the user info */
          border-radius: 5px; /* Rounded corners */
          background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
        }
        `}
      </style>
    </header>
  );
};

export default Header;
