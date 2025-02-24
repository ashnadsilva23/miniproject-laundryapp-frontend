import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const LoginUser = () => {
  const [data, setData] = useState({
    "email": "",
    "password": ""
  });

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const readValue = () => {
    axios.post("http://localhost:3030/signIn", data).then(
      (response) => {
        if (response.data.status === "success") {
          // Store token, userId, and username in sessionStorage
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("username", response.data.username);  // Store the username

          navigate('/userdashboard');  // Redirect to user dashboard
        } else {
          alert(response.data.status);
        }
      }
    ).catch(
      (error) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="container">
          <h1 className="text-center text-light"><u>Login</u></h1><br />
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label"><b>Email</b></label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={data.email}
                      onChange={inputHandler}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={data.password}
                      onChange={inputHandler}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <button className="btn btn-success btn-block" onClick={readValue}>
                      LOGIN
                    </button>
                  </div>
                  <div className="text-light">
                    New users click to Signup
                    <Link to="/reg">
                      <button className="btn btn-primary ml-2">Sign Up</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LoginUser