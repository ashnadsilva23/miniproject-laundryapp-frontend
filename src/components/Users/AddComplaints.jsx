import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const AddComplaints = () => {
  const { requestId } = useParams(); // Get the requestId from the URL parameter
  const [complaintdescription, setComplaintDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!complaintdescription) {
      setError('Complaint description is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3031/add-complaint', {
        userId,
        requestId,
        complaintdescription
      });

      if (response.status === 201) {
        setSuccessMessage('Complaint submitted successfully');
        setTimeout(() => {
          navigate('/viewmyrequests'); // Redirect to requests page after submission
        }, 2000); // Redirect after 2 seconds
      } else {
        setError('Failed to submit complaint');
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError('An error occurred while submitting the complaint');
    }
  };

  return (
    <div className="container mt-4">
      <Header/>
      <br/>
      <h2>Register Complaint</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleComplaintSubmit}>
        <div className="mb-3">
          <label htmlFor="complaintdescription" className="form-label">Complaint Description</label>
          <textarea
            id="complaintdescription"
            className="form-control"
            value={complaintdescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Complaint</button>
      </form>
    </div>
  );
};

export default AddComplaints;
