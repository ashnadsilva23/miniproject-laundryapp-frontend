import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AddService = () => {
  const [data, setData] = useState({
    sname: '',
    description: '',
    price: '',
  });

  const [file, setFile] = useState(null); // Separate state for file
  const [priceError, setPriceError] = useState(''); // State to track price validation error
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the price between 100-500
    if (name === 'price') {
      const priceValue = parseFloat(value);
      if (priceValue < 500 || priceValue > 3000) {
        setPriceError('Price must be between 100 and 500');
      } else {
        setPriceError(''); // Clear error if valid
      }
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save the selected file
  };

  const readValue = () => {
    if (priceError) {
      alert('Please correct the errors before submitting.');
      return; // Stop if there's a price validation error
    }

    const formData = new FormData();
    formData.append('sname', data.sname);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('image', file);

    axios.post('http://localhost:3031/addservice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.status === 'success') {
          alert('Service added successfully');
          navigate('/viewallservices');
        } else if (response.data.status === 'error' && response.data.message === 'Service already exists') {
          alert('Service already exists');
        } else {
          alert('Failed to add the service');
        }
      })
      .catch((error) => {
        console.error('Error adding service:', error);
        alert('An error occurred while adding the service.');
      });
  };

  return (
    <div>
      <Header/>

      <div className="container-fluid mt-4">
        <div className="row">
        
          

          {/* Main Content */}
            <div className="content-area">
              <br />
              <br />

              <h2 className="mb-4 text-center">Add a New Service</h2>
              
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sname"
                      value={data.sname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={data.price}
                      onChange={handleChange}
                      required
                    />
                    {priceError && (
                      <small className="text-danger">{priceError}</small> // Display validation error message
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Image:</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleFileChange} // Handle file selection
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn btn-success" onClick={readValue}>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  );
};

export default AddService;
