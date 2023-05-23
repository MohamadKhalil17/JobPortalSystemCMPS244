import React, { useState, useEffect, startTransition } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditJobSeeker() {

  let navigate = useNavigate();
  const { id } = useParams();


  const [jobSeeker,setJobSeeker] = useState({
    firstName :"",
    lastName : "",
    address: "",
    phone : "",
    dateOfBirth : "",
    email: ""
  })

  const {firstName, lastName, address, phone, dateOfBirth,email}=jobSeeker



  useEffect(() => {
    loadJobSeeker();
  }, []);

  const loadJobSeeker = async () => {
    const myjobSeeker = await axios.get(`http://localhost:5000/jobseeker/${id}`);
    setJobSeeker(myjobSeeker.data);
  };

  return (
    <div className='container'>
      <div className='raw'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4 text-primary' >View Job Seeker</h2>
          <form >
          <div className='mb-3'>
            <label htmlFor='firstName' className='form-label'>
              firstName
            </label> 
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter your first Name"
            name='firstName'
            value={firstName}
            
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='lastName' className='form-label'>
            lastName
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter your last name"
            name='lastName'
            value={lastName}
                      />
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
            address
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the address"
            name='address'
            value={address}
            
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
            phone
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter your phone number"
            name='phone'
            value={phone}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='dateOfBirth' className='form-label'>
            dateOfBirth
            </label>
            <input readOnly
            type={"date"}
            className='form-control'
            placeholder="Enter your dateOfBirth"
            name='dateOfBirth'
            value={dateOfBirth}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
            email
            </label>
            <input readOnly 
            type={"text"}
            className='form-control'
            placeholder="Enter your email"
            name='email'
            value={email}
            />
          </div>
          
          <Link type='submit' className='btn btn-danger mx-3' to="/jobSeekers">Cancel</Link>
          </form>
        </div>
      </div>
    </div> 
  )
}