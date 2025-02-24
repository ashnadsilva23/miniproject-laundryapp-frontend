import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const DemoPayment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    // Get requestId and totalAmount passed from ViewMyRequest page
    const { requestId, totalAmount } = location.state || {};

    // Stripe public key
    const PUBLIC_KEY = "pk_test_51QD1JrAYsfjpGlhUAhZDJJ7iHDjy8ZrrpIqaYjEt9gqIXAXfITZQLbud1Wyac4RtoVDz3m2BHC1OR4Ur2xJMoX7800CNDlow85";

    // Initialize Stripe
    const stripePromise = loadStripe(PUBLIC_KEY);

    // Set the amount to the one passed from the previous page
    useEffect(() => {
        if (totalAmount) {
            setAmount(totalAmount);
        }
    }, [totalAmount]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const stripe = await stripePromise;

            // Create a payment method with Stripe
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: {
                    number: cardNumber,
                    exp_month: parseInt(expiryDate.split('/')[0]),
                    exp_year: parseInt(expiryDate.split('/')[1]),
                    cvc: cvc,
                },
            });

            if (error) {
                setMessage(error.message);
                setLoading(false);
                return;
            }

            // Proceed to send payment details to your backend
            const response = await axios.post('http://localhost:3031/pay', {
                requestId,
                paymentMethod: paymentMethod.id, // Pass the payment method ID
                amount: parseFloat(amount) * 100, // Convert amount to paise
            });

            setMessage(`Payment successful! Payment ID: ${response.data.payment.id}`);
        } catch (error) {
            console.error(error);
            setMessage('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container" style={{ width: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Make a Payment</h3>

            <p><strong>Request ID:</strong> {requestId}</p>
            <p><strong>Amount:</strong> ₹{amount}</p>

            <form onSubmit={handlePayment}>
                <div>
                    <label>Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>CVC</label>
                    <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        </div>
    );
};

export default DemoPayment;
