import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const DeliveryTable = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [statusUpdate, setStatusUpdate] = useState({});

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('http://localhost:3031/deliveries');
                setDeliveries(response.data.data);
            } catch (error) {
                console.error('Error fetching deliveries:', error);
            }
        };

        fetchDeliveries();
    }, []);

    const handleStatusChange = (deliveryId, newStatus) => {
        setStatusUpdate((prevStatus) => ({
            ...prevStatus,
            [deliveryId]: newStatus,
        }));
    };

    const updateStatus = async (deliveryId) => {
        const newStatus = statusUpdate[deliveryId];
        if (!newStatus) return;

        try {
            await axios.patch(`http://localhost:3031/deliveries/${deliveryId}`, {
                status: newStatus,
            });
            setDeliveries((prevDeliveries) =>
                prevDeliveries.map((delivery) =>
                    delivery._id === deliveryId
                        ? { ...delivery, status: newStatus }
                        : delivery
                )
            );
            alert(`Status updated to "${newStatus}" successfully`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div>
            <Header/>
            <h2>All Deliveries</h2>
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Email</th>
                        <th>Pickup Date</th>
                        <th>Pickup Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery) => (
                        <tr key={delivery._id}>
                            <td>{delivery.requestId}</td>
                            <td>{delivery.userId.email}</td>
                            <td>{delivery.pickupDate}</td>
                            <td>{delivery.pickupTime}</td>
                            <td>
                                <select
                                    value={statusUpdate[delivery._id] || delivery.status}
                                    onChange={(e) => handleStatusChange(delivery._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="pickup">Pickup</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => updateStatus(delivery._id)}>
                                     {statusUpdate[delivery._id] || delivery.status}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Embedded CSS for styling */}
            <style jsx>{`
                .container {
                    margin: 20px auto;
                    padding: 20px;
                    width: 90%;
                    max-width: 800px;
                    text-align: center;
                    font-family: Arial, sans-serif;
                }

                h2 {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                thead {
                    background-color: #f2f2f2;
                }

                th, td {
                    padding: 12px;
                    border: 1px solid #ddd;
                    text-align: left;
                }

                th {
                    font-weight: bold;
                    color: #444;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                tr:hover {
                    background-color: #f1f1f1;
                }

                select {
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    padding: 8px 12px;
                    border: none;
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #45a049;
                }
            `}</style>
        </div>
    );
};

export default DeliveryTable;
