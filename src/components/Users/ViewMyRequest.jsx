import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ViewMyRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '900px',
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
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px',
            textAlign: 'center',
        },
        td: {
            padding: '10px',
            textAlign: 'center',
            border: '1px solid #ccc',
        },
        button: {
            padding: '5px 10px',
            fontSize: '12px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 2px',
        },
        btnDanger: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        btnSuccess: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        btnInfo: {
            backgroundColor: '#17a2b8',
            color: 'white',
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        alertDanger: {
            color: '#dc3545',
            textAlign: 'center',
            padding: '10px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        paymentBox: {
            border: '1px solid #007bff',
            borderRadius: '5px',
            padding: '5px 10px',
            backgroundColor: '#f1f8ff',
            color: '#007bff',
            textAlign: 'right',
            width: 'fit-content',
            margin: '0 auto',
        },
    };

    useEffect(() => {
        const fetchRequests = async () => {
            const token = sessionStorage.getItem('token');

            if (!token) {
                setError("No token found");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3031/viewmyrequests', {
                    headers: { token }
                });

                if (response.data.status === "success") {
                    setRequests(response.data.data);
                } else {
                    setError("Failed to fetch requests");
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
                setError("An error occurred while fetching requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleComplaintClick = (requestId) => {
        navigate(`/add-complaint/${requestId}`);
    };

    const handlePaymentClick = (requestId) => {
        navigate(`/delivery/${requestId}`);
    };

    const handleShowClick = (requestId) => {
        navigate(`/request-details/${requestId}`);
    };

    if (loading) {
        return <div>Loading requests...</div>;
    }

    if (error) {
        return <div style={styles.alertDanger}>{error}</div>;
    }

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h3 style={styles.header}>Your Requests</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Services & Products</th>
                                <th style={styles.th}>Total Quantity</th>
                                <th style={styles.th}>Total Amount</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Payment Status</th>
                                <th style={styles.th}>Register Complaints</th>
                                <th style={styles.th}>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => {
                                const servicesAndProducts = request.services.map(service => {
                                    const productDetails = service.products.map(product => {
                                        const productName = product.productName || 'Unknown Product';
                                        return `${productName} (Qty: ${product.quantity || 0})`;
                                    }).join(', ');

                                    return `${service.serviceName || 'Unknown Service'}: ${productDetails}`;
                                }).join(' | ');

                                const totalQuantity = request.services.reduce((total, service) => {
                                    return total + service.products.reduce((subTotal, product) => subTotal + (product.quantity || 0), 0);
                                }, 0);

                                const combinedStatus = `${request.status}`;
                                const paymentStatus = request.paymentStatus || 'Pending';

                                return (
                                    <tr key={request._id}>
                                        <td>{servicesAndProducts || 'No services or products available'}</td>
                                        <td style={{ textAlign: 'center' }}>{totalQuantity}</td>
                                        <td>{request.totalAmount}</td>
                                        <td>
                                            <div style={styles.buttonContainer}>
                                                <button
                                                    style={{
                                                        ...styles.button,
                                                        ...(request.status === 'rejected' ? styles.btnDanger : request.status === 'accepted' ? styles.btnSuccess : styles.btnInfo)
                                                    }}
                                                >
                                                    {combinedStatus}
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={styles.paymentBox}>{paymentStatus}</div> {/* Payment status in a box */}
                                        </td>
                                        <td>
                                            <div style={styles.buttonContainer}>
                                                <button
                                                    style={{ ...styles.button, ...styles.btnPrimary }}
                                                    onClick={() => handleComplaintClick(request._id)}
                                                >
                                                    Register Complaint
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={styles.buttonContainer}>
                                                <button
                                                    style={{ ...styles.button, ...styles.btnInfo }}
                                                    onClick={() => handleShowClick(request._id)}
                                                >
                                                    Show
                                                </button>
                                                {request.status === 'accepted' && (  // Only show payment button if status is accepted
                                                    <button
                                                        style={{ ...styles.button, ...styles.btnSuccess }}
                                                        onClick={() => handlePaymentClick(request._id)}
                                                    >
                                                        Pay
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewMyRequest;
