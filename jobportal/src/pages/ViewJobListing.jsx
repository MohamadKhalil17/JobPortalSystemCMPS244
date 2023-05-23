import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewJobListing() {

  let navigate = useNavigate();
  const { id } = useParams();


  const [jobListing,setJobListing] = useState({
    jobTitle :"",
    location : "",
    salary: "",
    description : "",
    jobType : "",
    postDate: "",
    employerName: null
  })

  const {jobTitle, location, salary, description, jobType, postDate, employerName}=jobListing



  useEffect(() => {
    loadJobListing();
  }, []);


  const loadJobListing = async () => {
    const myjobListing = await axios.get(`http://localhost:5000/job/${id}`);
    console.log(myjobListing.data)
    setJobListing(myjobListing.data);
  };

  return (
    <div className='container'>
      <div className='raw'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4 text-primary' >View Job Listing</h2>
          <form >
          <div className='mb-3'>
            <label htmlFor='jobTitle' className='form-label'>
              Job Title
            </label>
            <input readOnly 
            type={"text"}
            className='form-control'
            placeholder="Enter the job Title"
            name='jobTitle'
            value={jobTitle}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='location' className='form-label'>
              Location
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the job's location"
            name='location'
            value={location}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='salary' className='form-label'>
              Salary
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the salary"
            name='salary'
            value={salary}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
            description
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the job description"
            name='description'
            value={description}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='jobType' className='form-label'>
            Job Type
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the job type"
            name='jobType'
            value={jobType}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='postDate' className='form-label'>
            postDate
            </label>
            <input readOnly
            type={"date"}
            className='form-control'
            placeholder="Enter the posting date in the format YYYY-MM-DD"
            name='postDate'
            value={postDate}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='employerName' className='form-label'>
              Employer Name
            </label>
            <input readOnly
            type={"text"}
            className='form-control'
            placeholder="Enter the company's name"
            name='employerName'
            value={employerName}
            />
          </div>
          <Link type='submit' className='btn btn-danger mx-3' to="/joblistings">Cancel</Link>
          </form>
        </div>
      </div>
    </div> 
  )
}