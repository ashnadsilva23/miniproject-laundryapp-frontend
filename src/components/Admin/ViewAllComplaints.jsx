import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const ViewAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3031/viewallcomplaints', {
          headers: { token },
        });

        if (response.data.status === 'success') {
          setComplaints(response.data.data);
        } else {
          setError('Failed to fetch complaints');
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError('An error occurred while fetching complaints.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (complaintId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:3031/updateComplaintStatus/${complaintId}`, {
        status: 'solved',
      }, {
        headers: { token },
      });

      if (response.data.status === 'success') {
        // Update the status locally in the state
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId ? { ...complaint, status: 'solved' } : complaint
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div>Loading complaints...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <Header />
      <br />

      <style>
        {`
          .container {
            padding: 20px;
          }
          .header-box {
            background-color: #e3f2fd; /* Light blue background */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          h3 {
            color: #4A90E2; /* Header text color */
            text-align: center;
            font-weight: bold;
          }
          .table {
            border-radius: 10px; /* Rounded corners for table */
            overflow: hidden; /* Ensure the corners are rounded */
          }
          .table thead th {
            background-color: #4A90E2; /* Header background color */
            color: white; /* Header text color */
          }
          .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.05); /* Alternate row color */
          }
          .badge {
            font-size: 1em;
          }
          .btn-warning {
            background-color: #FFC107; /* Warning button color */
            border: none;
          }
        `}
      </style>

      <div className="header-box">
        <h3>All Complaints</h3>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Request ID</th>
            <th>Complaint Description</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.userId ? complaint.userId.name : 'N/A'}</td>
              <td>{complaint.requestId ? complaint.requestId._id : 'N/A'}</td>
              <td>{complaint.complaintdescription}</td>
              <td>{new Date(complaint.createdAt).toLocaleString()}</td>
              <td>{complaint.status || 'pending'}</td>
              <td>
                {complaint.status === 'solved' ? (
                  <span className="badge bg-success">Solved</span>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdateStatus(complaint._id)}
                  >
                    Mark as Solved
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default ViewAllComplaints;
