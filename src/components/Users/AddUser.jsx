import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [data, changeData] = useState({
        name: "",
        phone: "",
        place: "",
        address: "",
        pincode: "",
        gender: "",
        email: "",
        password: "",
        confirmpswd: ""
    });
    const navigate = useNavigate();

    const inputHandler = (event) => {
        changeData({ ...data, [event.target.name]: event.target.value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z][a-z0-9]*(\.[a-z0-9]+)*@[a-z0-9]+\.[a-z]{2,}(\.[a-z]{2,})?$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address (e.g., example@gmail.com). The first character must be an alphabet and the rest must be lowercase letters or numbers.");
            return false;
        }
        return true;
    };

    const validateForm = () => {
        const { name, phone, place, address, pincode, gender, email, password, confirmpswd } = data;
        if (!name || !phone || !place || !address || !pincode || !gender || !email || !password || !confirmpswd) {
            alert("All fields are required!");
            return false;
        }
        if (!validateEmail(email)) return false;
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return false;
        }
        if (/[^a-zA-Z]/.test(name)) {
            alert("Username must contain only alphabetic characters.");
            return false;
        }
        if (password !== confirmpswd) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    };

    const readValue = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        axios.post("http://localhost:3031/signUp", data)
            .then((response) => {
                if (response.data.status === "success") {
                    alert("Successfully added");
                    navigate('/login');
                } else {
                    alert("Failed to add user");
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div style={styles.container}>
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <h1 style={styles.title}>LaundryPro</h1>
                <nav>
                    <Link to="/" style={styles.link}>Home</Link>
                </nav>
            </div>
        </header>

        <div style={styles.formContainer}>
                <div style={styles.cardHeader}>
                    <h2>Sign Up</h2>
                </div>
                
                <div className="card-body">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    value={data.name} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={data.email} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phone" 
                                    value={data.phone} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your phone number" 
                                    required 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="place" className="form-label">Place</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="place" 
                                    value={data.place} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your place" 
                                    required 
                                />
                            </div>
                         

                            <div className="col-md-6">
                                <label htmlFor="pincode" className="form-label">Pincode</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="pincode" 
                                    value={data.pincode} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your pincode" 
                                    required 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select 
                                    className="form-select" 
                                    name="gender" 
                                    value={data.gender} 
                                    onChange={inputHandler} 
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="col-12">
    <label htmlFor="address" className="form-label">Address</label>
    <textarea 
        className="form-control" 
        name="address" 
        value={data.address} 
        onChange={inputHandler} 
        placeholder="Enter your address" 
        required 
        rows="3" 
        style={{ width: '100%' }} // Ensure full width
    />
</div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    value={data.password} 
                                    onChange={inputHandler} 
                                    placeholder="Enter your password" 
                                    required 
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="confirmpswd" className="form-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="confirmpswd" 
                                    value={data.confirmpswd} 
                                    onChange={inputHandler} 
                                    placeholder="Confirm your password" 
                                    required 
                                />
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-success w-100 mt-2" onClick={readValue}>Register</button>
                                <p className="mt-2">Already have an account? <Link to="/userlogin">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
    },
    header: {
        backgroundColor: '#007bff',
        color: 'white',
        width: '100%',
        padding: '15px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '28px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
    },
    formContainer: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        padding: '20px',
    },
    cardHeader: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 0',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        width: '100%',
    },
    buttonContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
    },
    loginLink: {
        color: '#007bff',
        textDecoration: 'underline',
    },
};

export default AddUser;
