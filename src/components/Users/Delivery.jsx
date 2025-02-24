import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const Delivery = () => {
    const [requestData, setRequestData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // New state for alert visibility
    const { requestId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:3031/viewmyrequests/${requestId}`, {
                    headers: { token },
                });

                if (response.data.status === 'success') {
                    setRequestData(response.data.data);
                    const userId = response.data.data.userId;
                    await fetchUserData(userId);
                } else {
                    setError('Failed to fetch request data.');
                }
            } catch (error) {
                console.error('Error fetching request data:', error);
                setError('An error occurred while fetching request data.');
            }
        };

        const fetchUserData = async (userId) => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:3031/users/${userId}`, {
                    headers: { token },
                });

                if (response.data.status === 'success') {
                    setUserData(response.data.data);
                } else {
                    setError('Failed to fetch user data.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred while fetching user data.');
            }
        };

        fetchRequestData();
    }, [requestId]);

    const validatePickupDetails = () => {
        const currentDate = new Date();
        const selectedDate = new Date(pickupDate);
        const selectedTime = pickupTime;

        if (isNaN(selectedDate.getTime())) {
            setError('Please select a valid pickup date.');
            return false;
        }

        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            setError('Pickup date must be today or in the future.');
            return false;
        }

        if (selectedDate.getDay() === 0) {
            setError('Pickup date cannot be on a Sunday.');
            return false;
        }

        const [hours, minutes] = selectedTime.split(':');
        const selectedHours = parseInt(hours);
        if (selectedHours < 10 || selectedHours > 16 || (selectedHours === 16 && minutes !== '00')) {
            setError('Pickup time must be between 10:00 AM and 4:00 PM.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSaveAndNavigate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowAlert(false); // Hide alert before making a request
    
        if (!validatePickupDetails()) {
            setLoading(false);
            return;
        }
    
        const userId = sessionStorage.getItem('userId');
        const amount = requestData?.totalAmount;
    
        const pickupDetails = {
            requestId: requestId,
            userId: userId,
            pickupDate: pickupDate,
            pickupTime: pickupTime,
        };
    
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post('http://localhost:3031/delivery', pickupDetails, {
                headers: { token },
            });
    
            if (response.data.status === 'success') {
                if (response.data.data.isPaid === true) {
                    setShowAlert(true); // Show alert for payment already done
                    setError('Payment has already been completed for this request.'); // Update the error message
                } else {
                    navigate(`/pay?amount=${amount}&customerId=${userId}&pickupDate=${pickupDate}&pickupTime=${pickupTime}`);
                }
            } else if (response.data.status === 'error') {
                // Handle the case where the backend returns an error message
                setShowAlert(true);
                setError(response.data.message);
            } else {
                setError('Failed to save pickup details.');
            }
        } catch (err) {
            console.error('Error saving pickup details:', err.response ? err.response.data : err);
            setError('An error occurred while saving pickup details. check the payment has been already done');
        } finally {
            setLoading(false);
        }
    };
    
    

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: '20px auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        header: {
            fontSize: '24px',
            marginBottom: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#007bff',
            borderBottom: '2px solid #007bff',
            paddingBottom: '10px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
        },
        buttonDisabled: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed',
        },
        alertDanger: {
            color: '#dc3545',
            textAlign: 'center',
            padding: '10px',
            border: '1px solid #dc3545',
            borderRadius: '5px',
            marginTop: '10px',
        },
    };
    

    return (
        <div>
            <Header />

            <div style={styles.container}>
                <h3 style={styles.header}>Delivery Details</h3>

                {requestData ? (
                    <>
                        <div style={styles.formGroup}>
                            <h5><strong>Request ID:</strong> {requestId}</h5>
                            <h5>Total Amount: ₹{requestData.totalAmount}</h5>
                            {userData && (
                                <>
                                    <h5><strong>Address:</strong> {userData.address}</h5>
                                    <h5><strong>Pincode:</strong> {userData.pincode}</h5>
                                    <h5><strong>Email:</strong> {userData.email}</h5>
                                </>
                            )}
                        </div>

                        <form onSubmit={handleSaveAndNavigate}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Pickup Date</label>
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Pickup Time</label>
                                <input
                                    type="time"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Amount</label>
                                <input
                                    type="text"
                                    value={requestData.totalAmount}
                                    readOnly
                                    style={styles.input}
                                />
                            </div>
                            <button
                                type="submit"
                                style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Save and Proceed to Pay'}
                            </button>
                        </form>

                        {error && (
                            <div style={styles.alertDanger}>
                                {error}
                            </div>
                        )}

                        {showAlert && (
                            <div style={{ ...styles.alertDanger, marginTop: '20px' }}>
                                Payment has already been done. Please check your transaction history.
                            </div>
                        )}
                    </>
                ) : (
                    <p>Loading request details...</p>
                )}
            </div>
        </div>
    );
};

export default Delivery;
