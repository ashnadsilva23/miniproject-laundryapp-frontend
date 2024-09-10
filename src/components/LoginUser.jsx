import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginUser = () =>{
    const [data, setdata] = useState({
        "email": "",
        "password": ""
    })
    const inputhandler = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value })
    }
    const readValue = () => {
        axios.post("http://localhost:3030/signIn", data).then(
            (response) => {
                if (response.data.status == "success") {
                    sessionStorage.setItem("token", response.data.token)
                    sessionStorage.setItem("userid", response.data.userid)
                    navigate("/add")
                }
                else {
                    alert(response.data.status)
                }
            }
        ).catch(
            (error) => {
                console.log(error.message)
                alert(error.message)
            }
        ).finally()
    }
    let navigate = useNavigate()
  return (
    <div>
             
    <h1 align="center"><u>Login </u></h1><br></br>
    
    <div className="container">
    <div className="card">
    <div class="card-body">
        <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label"><b>Email</b></label>
                        <input type="text" className="form-control" name='email' value={data.email} onChange={inputhandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label"><b>password</b></label>
                        <input type="password" name="password" value={data.password} onChange={inputhandler} id="" className="form-control" />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValue}>LOGIN</button>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <p>  new users click to Signup <Link to="/reg">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
  )
}


export default LoginUser