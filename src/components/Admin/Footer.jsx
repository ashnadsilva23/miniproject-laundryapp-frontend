import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <style>
        {`
        .footer {
          background-color: #2C3E50; /* Dark blue color */
          color: white; /* Text color */
          padding: 20px; /* Padding for the footer */
          text-align: center; /* Centered text */
          position: relative; /* Positioned relative for footer */
          bottom: 0; /* Align to bottom */
          width: 100%; /* Full width */
        }

        .footer-container {
          max-width: 1200px; /* Maximum width for the footer */
          margin: 0 auto; /* Center the footer */
        }

        .social-links {
          margin-top: 10px; /* Space between copyright and social links */
        }

        .social-links a {
          color: white; /* Link color */
          margin: 0 10px; /* Space between links */
          text-decoration: none; /* Remove underline */
          transition: color 0.3s; /* Smooth transition for hover effect */
        }

        .social-links a:hover {
          color: #FFD700; /* Change color on hover */
        }
        `}
      </style>
    </footer>
  );
};

export default Footer;
