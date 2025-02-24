import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdNav from './AdNav';
import SideBar from '../sidebar/SideBar';
import Footer from './Footer'; // Import your Footer component
import Header from './Header';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // For navigating after update
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    place: '',
    address: '',
    gender: ''
  }); // State to store the user data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(''); // State to track errors

  // Fetch user data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3031/view/${id}`)
      .then(response => {
        setUser(response.data); // Set the user data to state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]);

  // Handle form changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  // Handle form submission for update
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3031/updateuser/${id}`, user)
      .then(response => {
        if (response.data.status === 'success') {
          alert("User updated successfully");
          navigate('/viewallusers'); // Redirect to the view page after successful update
        } else {
          alert("Error updating user");
        }
      })
      .catch(error => {
        console.error("Error updating user:", error);
        alert("Failed to update user. Please try again later.");
      });
  };

  // Show loading state
  if (loading) {
    return <div>Loading user data...</div>;
  }

  // Show error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render user details and update form once data is loaded
  return (
    <div>
      <Header />

      <div className="container-fluid">
        <div className="row">

          {/* Main Content */}
          <div className="col-md-10">
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-10"> {/* Change to col-md-10 or col-md-12 */}
                  <div className="card p-4 shadow-sm custom-card" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="text-center mb-4">User Details and Update</h5>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                        <label className="me-2">Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                        <label className="me-2">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                        <label className="me-2">Phone:</label>
                        <input
                          type="text"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                        <label className="me-2">Place:</label>
                        <input
                          type="text"
                          name="place"
                          value={user.place}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                        <label className="me-2">Address:</label>
                        <input
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-4 d-flex justify-content-between align-items-center">
                        <label className="me-2">Gender:</label>
                        <select
                          name="gender"
                          value={user.gender}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">Update</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* CSS Styles */}
      <style>{`
        .custom-card {
          max-width: 800px; /* Adjust this value to set the maximum width */
          width: 100%; /* Make sure it takes full width up to max-width */
          border-radius: 10px; /* Rounded corners for the card */
        }
        .form-group label {
          font-weight: bold; /* Bold labels for form fields */
        }
        .btn-primary {
          background-color: #007bff; /* Primary button color */
          border: none; /* No border for button */
        }
      `}</style>
    </div>
  );
};

export default UpdateUser;
