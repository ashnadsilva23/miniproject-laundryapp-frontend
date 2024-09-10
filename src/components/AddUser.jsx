import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddUser = () => {
    const [data, changeData] = useState({
         "name":"",
        "phone":"",
        "place":"",
        "address":"",
        "gender":"",
        "email":"",
        "password":"",
        "confirmpswd":""
        
    })
    const inputHandler = (event) => {
        changeData({ ...data, [event.target.name]: event.target.value })

    }
    
    const readValue = () => {

        console.log(data)
        if(data.password==data.confirmpswd)
            {
        axios.post("http://localhost:3030/signUp", data).then(
            (response) => {
                console.log(response.data)
                if (response.data.status == "success") {
                    alert("successfully added")
                }
                else {
                    alert("failed")
                }
                
            }
        )
    }
    else{
        alert("check password")
    }
    }
  return (
    <div>
    
    <h1 align="center"><u>SIGN UP</u></h1><br></br>
    <div className="card">
<div class="card-body">
    <div className="container">

        <div className="row">
            <div className="col">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label htmlFor="" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler} />
                        </div>                      
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Email</label>
                            <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" name='phone' value={data.phone} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Place </label>
                            <input type="text" className="form-control" name='place' value={data.place} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Address </label>
                            <input type="text" className="form-control" name='address' value={data.address} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="" className="form-label">Gender </label>
                            <select  id="" className="form-control"  name='gender' value={data.gender} onChange={inputHandler}>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Others">Others</option>
                            </select>
                           
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Password</label>
                            <input type="text" className="form-control" name='password' value={data.password} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label"> confirm Password</label>
                                <input type="password" className="form-control" name='confirmpswd' value={data.confirmpswd} onChange={inputHandler} />
                            </div>
                        
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <button className="btn btn-success" onClick={readValue}>Register</button>
                            <p> users click to Login <Link to="/">Login</Link></p>

                        </div>
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

export default AddUser