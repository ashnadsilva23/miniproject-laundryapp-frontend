import styled from "styled-components";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentForm = ({ amountInRupees, userId, username, useremail }) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element is not initialized.");
      return;
    }

    setLoading(true); // Set loading state

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      console.log("Payment Error:", error);
      setLoading(false);
    } else {
      try {
        const finalTotal = amountInRupees * 100; // Convert to paise

        const response = await axios.post("http://localhost:3031/pay", {
          amount: finalTotal,
          id: paymentMethod.id,
          userId: userId, // Use userId from props
          useremail: useremail, // Use useremail from props
          username: username, // Use username from props
        });

        if (response.data.success) {
          setSuccess(true);
        } else {
          setErrorMessage('Payment failed. Please try again.');
        }
      } catch (error) {
        console.log("Error:", error);
        setErrorMessage('Payment processing error. Please try again.');
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <Container>
      {!success ? (
        <Form onSubmit={handleSubmit}>
          <CardElement options={CARD_OPTIONS} />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Display error message */}
          <SubmitButton type="submit" disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Pay ₹' + amountInRupees}
          </SubmitButton>
        </Form>
      ) : (
        <SuccessMessage>Payment successful!</SuccessMessage>
      )}
    </Container>
  );
};

export default PaymentForm;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 500px; /* Set a maximum width */
  margin: 0 auto; /* Centers horizontally */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Takes full height of the viewport */
  background-color: #f9f9f9; /* Light background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
`;

const Form = styled.form`
  width: 100%; /* Full width for responsiveness */
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  padding: 15px;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 20px; /* Space above the button */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: translateY(-2px); /* Slight lift effect */
  }

  &:disabled {
    background-color: #cccccc; /* Light gray when disabled */
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #fa755a; /* Red color for error messages */
  margin-top: 10px; /* Space above the error message */
  font-size: 14px; /* Font size for the error message */
`;

const SuccessMessage = styled.h2`
  color: #4caf50; /* Green color for success */
  text-align: center; /* Center the success message */
`;
