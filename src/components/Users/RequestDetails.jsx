import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const RequestDetails = () => {
    const { requestId } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3031/request/${requestId}`);
                if (response.data.status === 'success') {
                    setRequest(response.data.data);
                } else {
                    setError('Request details not found');
                }
            } catch (error) {
                console.error('Error fetching request details:', error);
                setError('An error occurred while fetching request details');
            } finally {
                setLoading(false);
            }
        };

        fetchRequestDetails();
    }, [requestId]);

    if (loading) {
        return <div className="loading">Loading request details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="request-details-container">
            <Header/>
            <h2>Request Details</h2>
            <div className="details-card">
                <p><strong>Status:</strong> <span>{request.status}</span></p>
                <p><strong>Payment Status:</strong> <span>{request.paymentStatus || 'Pending'}</span></p>
                <p><strong>Total Amount:</strong> <span>{request.totalAmount}</span></p>
                <div className="services-container">
                    {request.services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.serviceId?.sname || 'Unknown Service'}</h3>
                            <ul className="products-list">
                                {service.products.map((product, idx) => (
                                    <li key={idx} className="product-item">
                                        {product.productId?.productname || 'Unknown Product'}
                                        <br />
                                        Quantity: {product.quantity || 0}
                                    </li>
                                ))}
                            </ul>
                            <p className="status-quantity">
                                <strong>Status:</strong> {request.status}<br />
                                <strong>Quantity:</strong> {service.products.reduce((acc, p) => acc + p.quantity, 0)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx="true">{`
                .request-details-container {
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                }

                h2 {
                    text-align: center;
                    color: #333;
                    font-size: 28px;
                    margin-bottom: 20px;
                }

                .details-card {
                    background: #f9f9f9;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .details-card p {
                    font-size: 16px;
                    margin: 10px 0;
                    color: #555;
                }

                .details-card p strong {
                    color: #333;
                }

                .details-card p span {
                    color: #2c3e50;
                    font-weight: bold;
                }

                .services-container {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-top: 20px;
                }

                .service-card {
                    background: #e8f0fe;
                    border-radius: 8px;
                    padding: 15px;
                    width: 200px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .service-card h3 {
                    font-size: 18px;
                    font-weight: 600;
                    color: #3c8dbc;
                    margin-bottom: 10px;
                }

                .products-list {
                    list-style-type: none;
                    padding: 0;
                    font-size: 14px;
                    color: #555;
                    margin: 0;
                }

                .product-item {
                    margin: 5px 0;
                }

                .status-quantity {
                    font-size: 14px;
                    color: #666;
                    margin-top: 10px;
                }

                .loading,
                .error {
                    text-align: center;
                    font-size: 18px;
                    margin-top: 30px;
                }

                .error {
                    color: red;
                }
            `}</style>
        </div>
    );
};

export default RequestDetails;
