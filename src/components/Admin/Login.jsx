import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const readValue = () => {
    axios.post("http://localhost:3031/login", data)
      .then((response) => {
        if (response.data.status === "success") {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("role", response.data.role);
          
          // Redirect based on the role
          if (response.data.role === 'admin') {
            navigate('/admindashboard');
          } else {
            navigate('/userdashboard');
          }
        } else {
          alert(response.data.errorMessage);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login: " + (error.response?.data.message || error.message));
      });
  };

  return (
    <div>
      <div className="headerContent">
        <h1 className="title">LaundryPro</h1>
        <nav>
          <Link to="/" className="link">Home</Link>
        </nav>
      </div>

      <div className="loginPage">
        <div>
          <div className="cardBody">
            <div className="inputGroup">
              <label htmlFor="email" className="label"><b>Email</b></label>
              <input
                type="text"
                className="input"
                name="email"
                value={data.email}
                onChange={inputHandler}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password" className="label"><b>Password</b></label>
              <input
                type="password"
                className="input"
                name="password"
                value={data.password}
                onChange={inputHandler}
                placeholder="Enter your password"
                autoComplete="off"
                required
              />
            </div>
            <div className="buttonGroup">
              <button className="loginButton" onClick={readValue}>
                LOGIN
              </button>
            </div>
            <div className="signupText">
              New user? 
              <Link to="/reg">
                <button className="signupButton">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
