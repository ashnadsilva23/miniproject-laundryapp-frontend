import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from './Header';

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigating after update
  const [products, setProduct] = useState({
    productname: '',
    pdescription: '',
    productPrice: '' // Add productPrice to the state
  }); // State to store the product data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(''); // State to track errors
  const [priceError, setPriceError] = useState(''); // State to track price validation error

  // Fetch product data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3031/viewproducts/${id}`)
      .then(response => {
        setProduct(response.data); // Set the product data to state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        setError("Failed to fetch product data. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]);

  // Handle form changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Product price validation
    if (name === 'productPrice') {
      const price = parseFloat(value);
      if (price < 30 || price > 100) {
        setPriceError('Price must be between 30 and 100');
      } else {
        setPriceError(''); // Clear error if valid
      }
    }

    setProduct({
      ...products,
      [name]: value
    });
  };

  // Handle form submission for update
  const handleSubmit = (event) => {
    event.preventDefault();

    if (priceError) {
      alert('Please correct the errors before submitting.');
      return;
    }

    axios.put(`http://localhost:3031/updateproducts/${id}`, products)
      .then(response => {
        if (response.data.status === 'success') {
          alert("Product updated successfully");
          navigate('/viewallproducts'); // Redirect to the view page after successful update
        } else {
          alert("Error updating product");
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again later.");
      });
  };

  // Show loading state
  if (loading) {
    return <div>Loading product data...</div>;
  }

  // Show error state
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Render product details and update form once data is loaded
  return (
    <div>
      {/* Navbar */}
      <Header/>

      <div className="container-fluid">
        
          {/* Main Content */}
          <div className="col-md-10">
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card p-4 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="text-center mb-4">Product Details and Update</h5>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="productname">Product Name:</label>
                        <input
                          type="text"
                          name="productname"
                          id="productname"
                          value={products.productname}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="productPrice">Product Price:</label>
                        <input
                          type="number"
                          name="productPrice"
                          id="productPrice"
                          value={products.productPrice}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                        {priceError && (
                          <small className="text-danger">{priceError}</small>
                        )}
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="pdescription">Description:</label>
                        <input
                          type="text"
                          name="pdescription"
                          id="pdescription"
                          value={products.pdescription}
                          onChange={handleInputChange}
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
  );
};

export default UpdateProduct;
