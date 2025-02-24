import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [complaintCount, setComplaintCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0); // New state for services
  const [productCount, setProductCount] = useState(0); // New state for products
  const navigate = useNavigate();

  // Fetch user count
  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:3031/user-count');
      if (response.data.status === 'success') {
        setUserCount(response.data.count);
      } else {
        console.error('Failed to fetch user count');
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  // Fetch request count
  const fetchRequestCount = async () => {
    try {
      const response = await axios.get('http://localhost:3031/request-count');
      if (response.data.status === 'success') {
        setRequestCount(response.data.count);
      } else {
        console.error('Failed to fetch request count');
      }
    } catch (error) {
      console.error('Error fetching request count:', error);
    }
  };

  // Fetch complaint count
  const fetchComplaintCount = async () => {
    try {
      const response = await axios.get('http://localhost:3031/complaint-count');
      if (response.data.status === 'success') {
        setComplaintCount(response.data.count);
      } else {
        console.error('Failed to fetch complaint count');
      }
    } catch (error) {
      console.error('Error fetching complaint count:', error);
    }
  };

  // Fetch service count
  const fetchServiceCount = async () => {
    try {
      const response = await axios.get('http://localhost:3031/service-count'); // Ensure this endpoint exists
      if (response.data.status === 'success') {
        setServiceCount(response.data.count);
      } else {
        console.error('Failed to fetch service count');
      }
    } catch (error) {
      console.error('Error fetching service count:', error);
    }
  };

  // Fetch product count
  const fetchProductCount = async () => {
    try {
      const response = await axios.get('http://localhost:3031/product-count'); // Ensure this endpoint exists
      if (response.data.status === 'success') {
        setProductCount(response.data.count);
      } else {
        console.error('Failed to fetch product count');
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchRequestCount();
    fetchComplaintCount();
    fetchServiceCount(); // Fetch services count
    fetchProductCount(); // Fetch products count
  }, []);

  const cardData = [
    {
      title: 'Total Users',
      value: userCount,
      buttonText: 'View Users',
      buttonAction: () => navigate('/viewallusers'),
    },
    {
      title: 'Total Requests',
      value: requestCount,
      buttonText: 'View Requests',
      buttonAction: () => navigate('/viewallrequests'),
    },
    {
      title: 'Total Complaints',
      value: complaintCount,
      buttonText: 'View Complaints',
      buttonAction: () => navigate('/viewallcomplaints'),
    },
    {
      title: 'Total Services', // New service card
      value: serviceCount,
      buttonText: 'View Services',
      buttonAction: () => navigate('/viewallservices'), // Adjust this path as needed
    },
    {
      title: 'Total Products', // New product card
      value: productCount,
      buttonText: 'View Products',
      buttonAction: () => navigate('/viewallproducts'), // Adjust this path as needed
    },
  ];

  const handleLogout = () => {
    // Add logout functionality here
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="navbar-brand">Admin Dashboard</div>
        <div className="navbar-links">
          <span className="admin-name">Hi, Admin</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="cards-container">
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
              <button onClick={card.buttonAction}>{card.buttonText}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Laundry Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
