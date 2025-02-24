import React from 'react';
import './Dashboard.css'; // Ensure this path is correct based on your project structure

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <span className="navbar-brand">LaundryPro</span>
          <div className="navbar-links">
            <a href="/userdashboard" className="nav-link">Home</a>
            <a href="/viewallservices" className="nav-link">Services</a>
            <a href="/viewallproducts" className="nav-link">Products</a>
            <a href="/login" className="nav-link">Logout</a>
          </div>
        </div>
      </nav>

      {/* Dashboard Container */}
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="row">
          {/* Card 1: Requested Services */}
          <div className="col-md-4">
            <div className="card text-center mb-4">
              <div className="card-header">Request Service</div>
              <div className="card-body">
                <a href="/requestservice" className="btn btn-green">Request</a>
              </div>
            </div>
          </div>

          {/* Card 2: View My Requests */}
          <div className="col-md-4">
            <div className="card text-center mb-4">
              <div className="card-header">View My Requests</div>
              <div className="card-body">
                <a href="/viewmyrequests" className="btn btn-green">View My Requests</a>
              </div>
            </div>
          </div>

          {/* Card 3: Complaint Registration */}
          <div className="col-md-4">
            <div className="card text-center mb-4">
              <div className="card-header">Complaint Registration</div>
              <div className="card-body">
                <a href="/viewmycomplaints" className="btn btn-green">View Complaints</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 LaundryPro. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

// Inject CSS styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  .navbar {
    background-color: #007bff; /* Primary color */
    padding: 15px;
  }
  .navbar-brand {
    color: white;
    font-weight: bold;
    font-size: 1.2rem; /* Decreased font size */
  }
  .navbar-links {
    display: flex;
    gap: 15px;
  }
  .nav-link {
    color: white !important; /* Override default link color */
    font-size: 0.9rem; /* Decreased font size */
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  .container-fluid {
    margin-top: 20px;
    background: linear-gradient(to bottom right, #f0f8ff, #e6f7ff); /* Light gradient background */
    padding: 20px; /* Add padding to the container */
  }
  .card {
    border-radius: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: 300px; /* Increased width */
    height: 200px; /* Increased height */
    margin: auto; /* Center cards */
    padding: 20px; /* Added padding */
    background-color: #ffffff; /* Light background for the card */
  }
  .card-header {
    font-weight: bold;
    font-size: 1rem; /* Decreased font size */
  }
  .btn-green {
    background-color: #28a745; /* Green button color */
    color: white;
    font-size: 0.9rem; /* Decreased button text size */
    padding: 10px 20px; /* Add padding to buttons */
    border: none; /* Remove border */
    border-radius: 5px; /* Rounded corners */
  }
  .btn-green:hover {
    background-color: #218838; /* Darker green on hover */
  }
  .footer {
    background-color: #f8f9fa; /* Light background for footer */
    padding: 15px 0;
    position: relative;
    bottom: 0;
    width: 100%;
  }
  .footer p {
    margin: 0;
    color: #6c757d; /* Muted text color */
    font-size: 0.9rem; /* Decreased footer text size */
  }
`;
document.head.appendChild(styleSheet);
