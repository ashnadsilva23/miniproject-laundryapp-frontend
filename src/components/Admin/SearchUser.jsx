import axios from 'axios'
import React, { useState } from 'react'
import Header from './Header'

const SearchUser = () => {
    const [data, setData] = useState(

        {
            "name": ""

        }

    )
    const [result, setResult] = useState([])


    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(data)
        axios.post("http://localhost:3031/search",data).then(
          (response)=>{
            setResult(response.data)
          }
        ).catch().finally()
 
    }

    const deleteuser=(id)=>{
        let input={"_id":id}
        axios.post("http://localhost:3031/delete",input).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="success") {
                    alert("Successfully Deleted")
                } else {
                    alert("Error")
                }

            }
        ).catch().finally()
    }
    return (
        <div>
            <Header/>
            <br></br><h3><u><center>Search Users</center></u></h3><br></br>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12-col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">User Name</label>
                                <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <center><button className="btn btn-success" onClick={readValue}>Search</button></center>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br></br>
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <table class="table table-bordered border-primary">
                        
                            <thead>
                                <tr>
                                <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Place</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Gender</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                               {result.map(
                                (value,index)=>{
                                    return <tr>
                                   <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.place}</td>
                                            <td>{value.address}</td>
                                            <td>{value.gender}</td>
                                   
                                    <td><button className="btn btn-danger" onClick={()=>{deleteuser(value._id)}}>Delete</button></td>
                                </tr>
                                }
                               )}
                                
                            </tbody>
                        </table>
                   
                </div>
            </div>
        </div>
    )
}

export default SearchUser