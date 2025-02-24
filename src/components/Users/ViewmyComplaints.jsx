import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component

const ViewMyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3031/viewmycomplaints', {
          headers: { token }
        });

        if (response.data.status === "success") {
          setComplaints(response.data.data);
        } else {
          setError("Failed to fetch complaints");
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("An error occurred while fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div>Loading complaints...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div style={styles.container}>
      <Header /> {/* Assuming you have a Header component */}
      <div style={styles.complaintsBox}>
        <h3 style={styles.title}>Your Complaints</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Complaint Description</th>
              <th style={styles.th}>Request ID</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td style={styles.td}>{complaint.complaintdescription || 'No description provided'}</td>
                <td style={styles.td}>{complaint.requestId ? complaint.requestId._id : 'Unknown Request ID'}</td>
                <td style={styles.td}>
                  <button 
                    style={{
                      backgroundColor: complaint.status === 'accepted' ? 'green' :
                                      complaint.status === 'rejected' ? 'red' :
                                      complaint.status === 'pending' ? 'orange' : // Change for better indication
                                      'gray',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'default', // Change cursor for disabled state
                      width: '100%', // Make the button full width
                      fontSize: '14px' // Adjust font size for button
                    }}
                    disabled
                  >
                    {complaint.status || 'Unknown Status'}
                  </button>
                </td>
                <td style={styles.td}>{new Date(complaint.createdAt).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={styles.td}>No complaints found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  complaintsBox: {
    backgroundColor: '#ffffff', // White background for better card appearance
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '80%', // Adjust width of the card
    maxWidth: '900px', // Maximum width to maintain a neat look
  },
  title: {
    fontSize: '24px', // Title font size
    marginBottom: '15px', // Margin below the title
  },
  table: {
    width: '100%', // Full width
    borderCollapse: 'collapse', // Ensure no space between borders
  },
  th: {
    backgroundColor: '#007bff', // Blue background for table headings
    color: 'white', // White text for table headings
    textAlign: 'center', // Center align text in the headings
    padding: '10px', // Add padding for aesthetics
    fontSize: '16px', // Reduced font size for headings
  },
  td: {
    textAlign: 'center', // Center align text in the table cells
    padding: '10px', // Add padding for aesthetics
    border: '1px solid #ccc', // Add border to table cells
    fontSize: '14px', // Reduced font size for table cells
  }
};

export default ViewMyComplaints;
