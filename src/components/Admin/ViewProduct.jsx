import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdNav from './AdNav'; // Importing AdNav component
import SideBar from '../sidebar/SideBar'; // Importing SideBar component
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ViewProduct = () => {
    const [data, changeData] = useState([]);

    // Fetch product data from the server
    const fetchData = () => {
        axios.get("http://localhost:3031/viewproduct")
            .then(response => {
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                    changeData(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    changeData([]);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                changeData([]);
            });
    };

    // Handle product deletion
    const deleteProduct = (id) => {
        const input = { "_id": id };
        axios.post("http://localhost:3031/deleteproduct", input)
            .then(response => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully Deleted");
                    fetchData(); // Refresh product list after deletion
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product.");
            });
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header /> {/* Including the Navbar */}
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div>
                        {/* Optional Sidebar can go here */}
                    </div>

                    {/* Main Content */}
                    <div>
                        <div className="heading-box">
                            <h3 className="heading">View Products</h3>
                        </div>
                        <br />
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-light table-striped-columns">
                                        <thead className="table-header">
                                            <tr>
                                                <th scope="col" className="text-center">Product Name</th>
                                                <th scope="col" className="text-center">Product Description</th>
                                                <th scope="col" className="text-center">Product Image</th>
                                                <th scope="col" className="text-center">Product Price</th>
                                                <th scope="col" className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(data) && data.length > 0 ? (
                                                data.map((value) => (
                                                    <tr key={value._id}>
                                                        <td className="text-center">{value.productname}</td>
                                                        <td className="text-center">{value.pdescription}</td>
                                                        <td className="text-center">
                                                            {/* Display product image */}
                                                            <img
                                                                src={`http://localhost:3030/${value.productimage}`}
                                                                alt={value.productname}
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                        </td>
                                                        <td className="text-center">{value.productPrice}</td>
                                                        <td className="text-center">
                                                            <Link to={`/updateproducts/${value._id}`} className="btn btn-warning mx-2">
                                                                <i className="fas fa-edit" aria-hidden="true"></i> 
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger mx-2"
                                                                onClick={() => deleteProduct(value._id)}>
                                                                <i className="fas fa-trash-alt" aria-hidden="true"></i> 
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No products found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer /> {/* Footer component */}

            {/* CSS Styles */}
            <style>{`
                .heading-box {
                    background-color: lightblue; /* Light background color for the box */
                    border-radius: 5px; /* Rounded corners for the box */
                    padding: 20px; /* Padding inside the box */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow for a raised effect */
                    text-align: center; /* Center text inside the box */
                    margin: 20px 0; /* Margin for spacing above and below the box */
                }

                .heading {
                    color: #28a745; /* Green color for the heading */
                    font-size: 2rem; /* Increase the font size */
                    margin: 0; /* Remove default margin from heading */
                }

                .table-header {
                    color: white; /* White text color for headers */
                    font-weight: bold; /* Bold font for headers */
                }
                .table-header th {
                    padding: 15px; /* Padding for table header cells */
                    text-align: center; /* Center text in table header cells */
                    border: 1px solid #fff; /* Optional: White border around headers */
                }
            `}</style>
        </div>
    );
};

export default ViewProduct;
