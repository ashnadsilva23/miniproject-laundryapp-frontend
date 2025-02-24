import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const ServiceView = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3031/viewservice');
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchServices();
  }, []);

  const deleteService = async (id) => {
    const input = { '_id': id };
    try {
      const response = await axios.post('http://localhost:3031/deleteservice', input);
      if (response.data.status === 'success') {
        alert('Successfully Deleted');
        setData((prevData) => prevData.filter((service) => service._id !== id));
      } else {
        alert('Error deleting service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('An error occurred while deleting the service.');
    }
  };

  return (
    <div>

    <div>
      <Header/>
      <header className="header">
        <h1 className="header-title">Service Management</h1>
      </header>
      <div className="container">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="table-responsive">
          <table className="table table-light table-striped-columns">
            <thead>
              <tr>
                <th scope="col" className="text-center">Service Name</th>
                <th scope="col" className="text-center">Description</th>
                <th scope="col" className="text-center">Image</th>
                <th scope="col" className="text-center">Price</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((value) => (
                  <tr key={value._id}>
                    <td className="text-center">{value.sname}</td>
                    <td className="text-center">{value.description}</td>
                    <td className="text-center">
                      {value.image ? (
                        <img
                          src={`http://localhost:3031/${value.image}`} // Ensure the correct path
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          alt={value.sname}
                        />
                      ) : (
                        <span>No Image Available</span> // Fallback if no image
                      )}
                    </td>
                    <td className="text-center">{value.price}</td>
                    <td className="text-center">
                      <Link to={`/updateservice/${value._id}`} className="btn btn-warning mx-2">
                        <i className="fas fa-edit" aria-hidden="true"></i>
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteService(value._id)}>
                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Laundry Management System. All rights reserved.</p>
      </footer>

      <style>{`
        .header {
            background-color: #007bff; /* Blue background for the header */
            color: white;
            text-align: center;
            padding: 20px;
        }
        .header-title {
            font-size: 1.5rem; /* Reduced size of the header title */
        }
        .container {
            padding: 20px;
            background-color: #f8f9fa; /* Light background color for the main content */
        }
        .footer {
            background-color: #343a40; /* Dark background for the footer */
            color: white;
            text-align: center;
            padding: 10px 0;
            position: relative;
            bottom: 0;
            width: 100%;
        }
        .table-light {
            background-color: rgba(255, 255, 255, 0.8); /* Light background with transparency */
        }
        .table-light th {
            background-color: #007bff; /* Blue background for table headers */
            color: white; /* White text for headers */
        }
        .table-light td {
            background-color: rgba(255, 255, 255, 0.7); /* Light background for table cells */
        }
        .btn-secondary {
            background-color: #6c757d; /* Darker color for back button */
            border: none;
        }
      `}</style>
      <Footer/>
      </div>
    </div>
  );
};

export default ServiceView;
