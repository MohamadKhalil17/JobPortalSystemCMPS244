import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

    
function JobSeekers() {
    const [seekers, setSeekers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/jobseekers`);
            setSeekers(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);


      const deleteJobSeeker = async (id) => {
        await axios.delete(`http://localhost:5000/jobseeker/${id}`);
        //fetchData();
      };


      async function Filter(name){
        if (name === 'Company'){
            try {
                const response = await axios.get(`http://localhost:5000/job_seekers_by_company/${filter}`);
                setSeekers(response.data);
              } catch (error) {
                console.log(error);
              }
        }
        else if ( name === 'Location'){ 
            try {
                const response = await axios.get(`http://localhost:5000/job_seekers_by_location/${filter}`);
                setSeekers(response.data);
              } catch (error) {
                console.log(error);
              }
        }
        else if ( name === 'Skills'){ 
            try {
                const response = await axios.get(`http://localhost:5000/job_seekers_by_skill/${filter}`);
                setSeekers(response.data);
              } catch (error) {
                console.log(error);
              }
        }
        else{
            clearFilter();
        }
      }

      const handleChangeInput = event => {
        setFilter(event.target.value);
      }

      async function clearFilter() {
        document.getElementById('filterInput').value=''
        setFilter("");
        try {
          const response = await axios.get(`http://localhost:5000/jobseekers`);
          setSeekers(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      
    return ( 
        <div className='jobseekers'>
            <div className='seekers__title'>
                <h1 className='mt-4 text-primary'>Job Seekers</h1>
                <a className='btn btn-primary btn-lg' href='/addjobseeker'>Add Job Seeker</a>
            </div>
            <div className='seekers__filters'>
                <label htmlFor='filterInput'>Filter by:</label>
                <input id='filterInput' type='text' name="filterInput" onChange={handleChangeInput} value={filter}/>
                <button onClick={() => Filter('Company')} className='btn btn-primary btn-lg'>Filter by Company</button>
                <button onClick={() => Filter('Location')} className='btn btn-primary btn-lg'>Filter by Location</button>
                <button onClick={() => Filter('Skills')} className='btn btn-primary btn-lg'>Filter by Skills</button>
                <a onClick={clearFilter}>Clear Filter</a>
            </div>
            <div className='seekers__table py-4'>
            {
                seekers.length > 0 ? (
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seekers.map((seeker, index) => (
                            <tr key={index}>
                                <td>{seeker.firstName}</td>
                                <td>{seeker.lastName}</td>
                                <td>{seeker.email}</td>
                                <td>
                  <Link className='btn btn-primary mx-2'  to={ `/viewjobseeker/${seeker.seekerID}`}>View</Link>
                  <Link className='btn btn-outline-primary mx-2'  to={ `/edit_job_seeker/${seeker.seekerID}`}>Edit</Link>
                  <button className='btn btn-danger mx-2' onClick={() => deleteJobSeeker(seeker.seekerID)}>Delete</button>
                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <p>No seekers found.</p>
                )
            }
            </div>
        </div>
    )
}

export default JobSeekers