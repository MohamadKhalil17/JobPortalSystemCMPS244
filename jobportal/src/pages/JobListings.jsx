import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function JobListings() {
      
  const [name, setName] = useState("")
  const [jobListing, setJobListing] = useState([])


  useEffect(()=>{
    loadJobListings()
  },[])

  const loadJobListings=async ()=>{
    const jobListings = await axios.get("http://localhost:5000/job_listings")
    setJobListing(jobListings.data)
    console.log(jobListings.data)
  }

  const deleteJobListings = async (id) => {
    console.log(id)
    await axios.delete(`http://localhost:5000/joblisting/${id}`);
    loadJobListings();
  };
  
  async function Filter(){
    const filter = document.getElementById('filterInput')
    if (name == 'Company'){
      try {
          const response = await axios.get(`http://localhost:5000/jobs_by_company/${filter.value}`);
          setJobListing(response.data);
        } catch (error) {
          console.log(error);
        }
    }
    else if ( name == 'Location'){
      try {
        const response = await axios.get(`http://localhost:5000/jobs_by_location/${filter.value}`);
        setJobListing(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    else if ( name == 'Description'){
      try {
        const response = await axios.get(`http://localhost:5000/search_jobs/${filter.value}`);
        setJobListing(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    else if ( name == 'JobType'){
      try {
        const response = await axios.get(`http://localhost:5000/jobs_by_type/${filter.value}`);
        setJobListing(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    // else if ( name == 'range'){
    //   try {
    //     const response = await axios.get(`http://localhost:5000/jobs_by_salary_range/${filter.value}`);
    //     setJobListing(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    else if (name == ''){
      clear()
    }
  }
  
  async function clear(){
    document.getElementById('filterInput').value=''
    setName('')
    const jobListings = await axios.get("http://localhost:5000/job_listings")
    setJobListing(jobListings.data)
    console.log(jobListings.data)
  }
    
  

  return ( 
    
    <div className='container listings'>
      <div className='listings__title'>
        <h1 className='mt-4 text-primary'>Job Listings</h1>
        <a className='btn btn-primary btn-lg' href="/addjoblisting">Add Job Listing</a>
      </div>
      <div className='listings__filters'>
        <label htmlFor='filterInput'>Filter by:</label>
        <input id='filterInput' type='text' />
        <select id='selectFilter' value={name} onChange={(e) => setName(e.target.value)}>
          <option value = ''></option>
          <option value='Company'>Filter by Company</option>
          <option value='Location'>Filter by Location</option>
          <option value='Description'>Filter by Description Content</option>
          <option value='JobType'>Filter by Job Type</option>
          <option value='range'>Filter by Salary Range</option>
        </select>
        <button className='btn btn-lg btn-primary' onClick={Filter}>Filter</button>
        <a onClick={clear}>Clear Filter</a>
      </div>
      <div className='py-4 listings__table'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Row</th>
              <th scope="col">Title</th>
              <th scope="col">Post Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobListing.length > 0 ? (
              jobListing.map((job, index)=>(
              <tr key={job.jobListID}>
                <th scope="row" key={index}>{index+1}</th>
                <td>{job.jobTitle}</td>
                <td>{job.postDate}</td>
                <td>
                  <Link className='btn btn-primary mx-2'  to={ `/viewjoblisting/${job.jobListID}`}>View</Link>
                  <Link className='btn btn-outline-primary mx-2'  to={ `/edit_job_listing/${job.jobListID}`}>Edit</Link>
                  <button className='btn btn-danger mx-2' onClick={() => deleteJobListings(job.jobListID)}>Delete</button>
                </td>
              </tr>
              ))): (
                <p>No seekers found.</p>
            )
            }
          </tbody>
        </table>
      </div>
      
  </div>
  )
}