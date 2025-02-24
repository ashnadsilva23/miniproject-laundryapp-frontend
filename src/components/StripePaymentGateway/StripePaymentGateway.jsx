import styled from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../PaymentForm.js/PaymentForm";

const StripePaymentGateway = () => {
    const PUBLIC_KEY = "pk_test_51QD1JrAYsfjpGlhUAhZDJJ7iHDjy8ZrrpIqaYjEt9gqIXAXfITZQLbud1Wyac4RtoVDz3m2BHC1OR4Ur2xJMoX7800CNDlow85";
    const stripeTestPromise = loadStripe(PUBLIC_KEY);
    const location = useLocation();

    // Retrieve amount and customerId from state or query parameters
    const amountInRupees = location.state?.amount || new URLSearchParams(location.search).get("amount");
    const customerId = location.state?.customerId || new URLSearchParams(location.search).get("userid"); // Adjust as necessary
    const customerEmail = location.state?.customerId || new URLSearchParams(location.search).get("useremail"); // Adjust as necessary
    const customerName = location.state?.customerId || new URLSearchParams(location.search).get("username"); // Adjust as necessary

    return (
        <Container>
            <Elements stripe={stripeTestPromise}>
            <PaymentForm 
    amountInRupees={amountInRupees} 
    userId={customerId} 
    useremail={customerEmail} 
    username={customerName} 
/>
            </Elements>
        </Container>
    );
};

export default StripePaymentGateway;

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    @media (max-width: 600px) {
        padding: 20px;
        height: auto;
    }

    h2 {
        color: #007bff;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .StripeElement {
        padding: 12px;
        border: 1px solid #ced4da;
        border-radius: 8px;
        font-size: 1rem;
    }

    button {
        padding: 12px;
        background-color: #28a745;
        color: #ffffff;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #218838;
        }

        &:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
        }
    }

    div.error-message {
        color: #dc3545;
        font-size: 0.9rem;
        text-align: center;
    }
`;
