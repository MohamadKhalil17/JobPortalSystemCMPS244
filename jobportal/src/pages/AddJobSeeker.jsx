import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddJobSeeker() {

  let navigate = useNavigate();

  const [jobSeeker,setJobSeeker] = useState({
    firstName :"",
    lastName : "",
    address: "",
    phone : "",
    dateOfBirth : "",
    email: ""
  })

  const {firstName, lastName, address, phone, dateOfBirth,email}=jobSeeker

  const onInputChange=(e)=>{
      setJobSeeker({...jobSeeker,[e.target.name]:e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(jobSeeker)
    await axios.post("http://127.0.0.1:5000/jobseeker", jobSeeker);
    navigate("/jobSeekers");
  };

  return (
    <div className='container'>
      <div className='raw'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4 text-primary' >Add Job Seeker</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='firstName' className='form-label'>
              firstName
            </label> 
            <input 
            type={"text"}
            className='form-control'
            placeholder="Enter your first Name"
            name='firstName'
            value={firstName}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='lastName' className='form-label'>
            lastName
            </label>
            <input 
            type={"text"}
            className='form-control'
            placeholder="Enter your last name"
            name='lastName'
            value={lastName}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
            address
            </label>
            <input 
            type={"text"}
            className='form-control'
            placeholder="Enter the address"
            name='address'
            value={address}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
            phone
            </label>
            <input 
            type={"text"}
            className='form-control'
            placeholder="Enter your phone number"
            name='phone'
            value={phone}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='dateOfBirth' className='form-label'>
            dateOfBirth
            </label>
            <input 
            type={"date"}
            className='form-control'
            placeholder="Enter your dateOfBirth"
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
            email
            </label>
            <input 
            type={"text"}
            className='form-control'
            placeholder="Enter your email"
            name='email'
            value={email}
            onChange={(e)=>onInputChange(e)}
            />
          </div>
          
          <button type='submit' className='btn btn-primary my-2'>Submit</button>
          <Link type='submit' className='btn btn-danger mx-3' to="/jobSeekers">Cancel</Link>
          </form>
        </div>
      </div>
    </div> 
  )
}