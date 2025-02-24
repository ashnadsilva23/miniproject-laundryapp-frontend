// AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header component
import Footer from './Footer'; // Import Footer component
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [pdescription, setpdescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null); // For image file
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const handleproductPrice = (e) => {
    const value = parseInt(e.target.value, 10);

    if (value < 30 || value > 100) {
      alert('Please enter a value between 30 and 100');
      setProductPrice(''); // Clear input if invalid
    }
  };

  const handleDescriptionChange = (e) => {
    setpdescription(e.target.value);
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message

    // Check if the image is selected
    if (!image) {
      alert("Please select an image");
      return;
    }

    // Create form data to send both product name and image to the backend
    const formData = new FormData();
    formData.append("productname", productName); // Ensure the field name is the same as the one expected in backend
    formData.append("pdescription", pdescription); // Ensure the field name is the same as the one expected in backend
    formData.append("productPrice", productPrice); // Ensure the field name is the same as the one expected in backend
    formData.append("image", image); // Add image to form data

    try {
      const response = await axios.post('http://localhost:3031/addproduct', formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Tell server to expect form data
        }
      });

      setMessage(response.data.status);
      if (response.data.status === "success") {
        setProductName(''); // Clear the input field on success
        setpdescription(''); // Clear the input field on success
        setProductPrice(''); // Clear the input field on success
        setImage(null); // Clear the image input on success
        navigate('/viewallproducts');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage("Error adding product. Please try again.");
    }
  };

  return (
    <div>
      <Header/>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2 className="mt-3 text-center">Add Product</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Product Name */}
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={productName}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Product Description */}
              <div className="mb-3">
                <label htmlFor="pdescription" className="form-label">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="pdescription"
                  value={pdescription}
                  onChange={handleDescriptionChange} // Separate handler for description
                  required
                />
              </div>
              {/* Product Price */}
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)} // Directly update state on change
                  onBlur={handleproductPrice} // Validate only after input loses focus
                  min="30"
                  max="100"
                  placeholder="Enter price between 30 and 100"
                  required
                />
              </div>
              {/* Image Upload */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange} // Update image when a file is selected
                  accept="image/*"
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>

            {/* Message Display */}
            {message && <div className="mt-3 alert alert-info">{message}</div>}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddProduct;
