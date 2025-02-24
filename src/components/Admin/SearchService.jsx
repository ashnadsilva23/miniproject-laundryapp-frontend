import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'

const SearchService = () =>{
    const [data, setData] = useState(

        {
            "sname": ""

        }

    )
    const [result, setResult] = useState([])


    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        console.log(data)
        axios.post("http://localhost:3031/searchservice",data).then(
          (response)=>{
            setResult(response.data)
          }
        ).catch().finally()
 
    }

    const deleteService=(id)=>{
        let input={"_id":id}
        axios.post("http://localhost:3030/deleteservice",input).then(
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
            <br></br><h3><u><center>Search Service</center></u></h3><br></br>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12-col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Service Name</label>
                                <input type="text" className="form-control" name='sname' value={data.sname} onChange={inputHandler} />
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
                                    <th scope="col">Service Name</th>
                                    <th scope="col">Description </th>
                                    <th scope="col">Service Image </th>
                                    <th scope="col">price</th>

                                </tr>
                            </thead>
                            <tbody>
                               {result.map(
                                (value,index)=>{
                                    return <tr>
                                  <td>{value.sname}</td>
                                            <td>{value.description}</td>


                                            <td>
                                                <img src={value.imageurl} style={{ width: '150px', height: '100px' }} />
                                            </td>
                                            <td>{value.price}</td>

                                          
                                   
                                    <td><button className="btn btn-danger" onClick={()=>{deleteService(value._id)}}>Delete</button></td>
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


export default SearchService