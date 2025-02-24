import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const ViewUsers = () => {
    const [data, changeData] = useState([]);
    const navigate = useNavigate(); // Hook to navigate

    const fetchData = () => {
        axios.get("http://localhost:3031/view")
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

    const deleteUser = (id) => {
        const input = { "_id": id };
        axios.post("http://localhost:3031/delete", input)
            .then(response => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully Deleted");
                    fetchData(); // Refresh data after deletion
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting the user.");
            });
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    return (
        <div className="container">
            <Header />
            <br />

            <style>
                {`
                .container {
                    padding: 20px;
                }
                .back-button {
                    margin-bottom: 15px;
                }
                .header-box {
                    background-color: #e3f2fd; /* Light blue background */
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
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
                .text-center {
                    text-align: center;
                }
                .fas {
                    cursor: pointer;
                }
                .fas.fa-edit {
                    color: #007bff; /* Edit icon color */
                }
                .fas.fa-trash-alt {
                    color: red; /* Delete icon color */
                }
                .no-users {
                    text-align: center;
                    font-size: 1.2em;
                    color: #777; /* Gray color for no users message */
                }
                `}
            </style>

            {/* Back Button */}
            <div className="back-button">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    &larr; Back
                </button>
            </div>

            {/* Header Box */}
            <div className="header-box">
                <h3 className="text-center" style={{ fontWeight: 'bold', fontSize: '2em', color: '#4A90E2' }}>
                    <u>View Users</u>
                </h3>
            </div>

            {/* Main Content */}
            <div>
                <div className="table-responsive">
                    <table className="table table-light table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">Email</th>
                                <th scope="col" className="text-center">Phone</th>
                                <th scope="col" className="text-center">Place</th>
                                <th scope="col" className="text-center">Address</th>
                                <th scope="col" className="text-center">Gender</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((value) => (
                                    <tr key={value._id}>
                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.place}</td>
                                        <td>{value.address}</td>
                                        <td>{value.gender}</td>
                                        <td className="text-center">
                                            <Link to={`/updateuser/${value._id}`}>
                                                <i className="fas fa-edit" style={{ marginRight: '10px' }}></i>
                                            </Link>
                                            <i
                                                className="fas fa-trash-alt"
                                                onClick={() => deleteUser(value._id)}
                                                style={{ marginLeft: '10px' }}
                                            ></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="no-users">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewUsers;
