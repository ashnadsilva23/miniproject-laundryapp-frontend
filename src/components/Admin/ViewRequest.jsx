import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const ViewRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3031/viewallrequests', {
        headers: { token }
      });

      if (response.data.status === "success") {
        setRequests(response.data.data);
      } else {
        setError("Failed to fetch requests");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("An error occurred while fetching requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId, newStatus) => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3031/updateRequestStatus/${requestId}`, { status: newStatus }, {
        headers: { token }
      });

      if (response.data.status === "success") {
        setRequests(prevRequests => 
          prevRequests.map(request => 
            request._id === requestId ? { ...request, status: newStatus } : request
          )
        );
      } else {
        setError("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("An error occurred while updating status.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading requests...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className="container mt-5">
        {/* Boxed Header */}
        <div className="header-box" >
          <h3 className="text-center">All Requests</h3>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Services & Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No requests found.</td>
              </tr>
            ) : (
              requests.map((request) => {
                // Combine services and products into a single display string
                const servicesAndProducts = request.services.map(({ serviceId, products }) => {
                  const productDetails = products.map(({ productId, quantity }) => {
                    // Check if productId exists before accessing its properties
                    return productId ? `${productId.productname} (Qty: ${quantity})` : 'Product not available';
                  }).join(', ');
                
                  return `${serviceId.sname}: ${productDetails || 'No products available'}`;
                }).join(' | '); // Separate each service with a pipe
                

                return (
                  <tr key={request._id}>
                    <td>{request._id}</td>
                    <td>{request.userId?.name || 'N/A'}</td>
                    <td>{servicesAndProducts || 'No services available'}</td>
                    <td>{request.totalAmount}</td>
                    <td>
                      <select
                        value={request.status || 'pending'}
                        onChange={(e) => updateStatus(request._id, e.target.value)}
                        className="form-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={`btn ${request.status === 'rejected' ? 'btn-danger' : (request.status === 'accepted' ? 'btn-success' : 'btn-info')}`}
                        onClick={() => alert(`Current status: ${request.status}`)}
                      >
                        {request.status === 'rejected' ? 'Rejected' : (request.status === 'accepted' ? 'Accepted' : 'Pending')}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Footer />
      <style>
  {`
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-box {
      background-color: #e3f2fd; /* Light blue background */
      padding: 20px; /* Padding inside the box */
      border-radius: 8px; /* Rounded corners */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      margin-bottom: 20px; /* Space below the header box */
    }
    .table {
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      text-align: center;
      vertical-align: middle;
    }
    th {
      background-color: #4A90E2; /* Header color */
      color: white; /* Header text color */
    }
    .btn {
      width: 100%;
    }
  `}
</style>

    </div>
  );
};

export default ViewRequest;
