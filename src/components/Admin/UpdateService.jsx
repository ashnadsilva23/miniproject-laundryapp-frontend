import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdNav from './AdNav';
import SideBar from '../sidebar/SideBar';

const UpdateService = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate(); // For navigating after update
  const [sname, setSname] = useState(''); // State for service name
  const [price, setPrice] = useState(''); // State for service price
  const [description, setDescription] = useState(''); // State for service description
  const [products, setProducts] = useState([]); // State for products array
  const [selectedProduct, setSelectedProduct] = useState(''); // State for selected product ID
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(''); // State to track errors
  const [validationError, setValidationError] = useState(''); // State to track validation errors

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3031/viewproduct'); // Adjust this endpoint
        setProducts(response.data); // Set the products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  // Fetch service data when the component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:3031/viewservice/${id}`);
        const { sname, price, description } = response.data; // Destructure from response
        setSname(sname); // Set service name
        setPrice(price); // Set service price
        setDescription(description); // Set service description
      } catch (error) {
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchServiceData();
  }, [id]);

  // Handle form submission for update
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation logic
    if (!sname || !description) {
      setValidationError("Service Name and Description cannot be empty.");
      return;
    }
    
    if (!price || isNaN(price) || price < 100 || price > 500) {
      setValidationError("Price must be a number between 100 and 500.");
      return;
    }
    
    setValidationError(''); // Clear any previous validation errors

    try {
      const response = await axios.put(`http://localhost:3031/updateservice/${id}`, {
        sname,
        price,
        description,
      });
      
      if (response.data.status === 'success') {
        alert("Service updated successfully");
        navigate('/viewservice'); // Redirect after successful update
      } else {
        alert("Error updating service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Show loading state
  if (loading) {
    return <div>Loading service data...</div>;
  }

  // Show error state
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Render service update form
  return (
    <div>
      <AdNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <SideBar />
          </div>
          <div className="col-md-10">
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card p-4 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="text-center mb-4">Update Service</h5>

                    {validationError && (
                      <div className="alert alert-danger text-center">
                        {validationError}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="sname">Service Name:</label>
                        <input
                          type="text"
                          name="sname"
                          id="sname"
                          value={sname}
                          onChange={(e) => setSname(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="price">Price:</label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="description">Description:</label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control"
                          required
                        />
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
    </div>
  );
};

export default UpdateService;
