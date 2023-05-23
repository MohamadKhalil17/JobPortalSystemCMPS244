import React, { useState , useEffect} from 'react';
import axios from 'axios';

function Applications() {
      const [applications, setApplications] = useState([]);
      const [applyform, setApplyForm] = useState(false);
      const [searchform, setSearchForm] = useState(false);
      const [statusCount, setStatusCount] = useState();
      const [formData, setFormData] = useState({
        dateApplied: '',
        status: '',
        jobListID: '',
        seekerID: ''
      });
    
      async function filterJob() {
        const filter = document.getElementById('filterInput');
        try {
          const response = await axios.get(`http://localhost:5000/applications_by_job/${filter.value}`);
          console.log(response.data);
          setApplications(response.data);
          setStatusCount();
        } catch (error) {
          console.log(error);
          clear();
        }
      }
    
      async function filterSeeker() {
        const filter = document.getElementById('filterInput');
        try {
          const response = await axios.get(`http://localhost:5000/applications_by_seeker/${filter.value}`);
          console.log(response.data);
          setApplications(response.data);
          setStatusCount();
        } catch (error) {
          console.log(error);
          clear();
        }
      }
    
      async function filterCompany() {
        const filter = document.getElementById('filterInput');
        try {
          const response = await axios.get(`http://localhost:5000/applications_by_date/${filter.value}`);
          console.log(response.data);
          setApplications(response.data);
          setStatusCount();
        } catch (error) {
          console.log(error);
          clear();
        }
      }
    
      async function filterStatusCount() {
        const filter = document.getElementById('filterInput');
        try {
          const response = await axios.get(`http://localhost:5000/application_status_count/${filter.value}`);
          console.log(response.data);
          setStatusCount(response.data);
          setApplications([]);
        } catch (error) {
          console.log(error);
          clear();
        }
      }
    
      function applyForm() {
        setApplyForm(true);
        setSearchForm(false);
      }
    
      function searchForm() {
        setApplyForm(false);
        setSearchForm(true);
      }
    
      async function clear() {
        document.getElementById('filterInput').value = '';
        setApplications([]);
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        axios.post('/create_application', formData)
          .then(response => {
            console.log(response.data);
            setApplications([...applications, response.data]);
            setFormData({
              dateApplied: '',
              status: '',
              jobListID: '',
              seekerID: ''
            });
          })
          .catch(error => {
            console.error(error);
          });
      };
    
      const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
    

    return ( 
        <div className='applications'>
            <div className='applications__title'>
                <h1 className='mt-4 text-primary'>Applications</h1>
            </div>
            <div className='applications__choice'>
                <button className='btn btn-primary btn-lg' onClick={applyForm}>Apply</button>
                <h1>OR</h1>
                <button className='btn btn-primary btn-lg' onClick={searchForm}>Search</button>

            </div>
            {applyform &&
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* <label>Date Applied:</label> */}
                        {/* <input type="text" name="dateApplied" value={formData.dateApplied} onChange={handleChange} /> */}

                        {/* <label>Status:</label> */}
                        {/* <input type="text" name="status" value={formData.status} onChange={handleChange} /> */}

                        <label>Job List ID:</label>
                        <input type="text" name="jobListID" value={formData.jobListID} onChange={handleChange} />

                        <label>Seeker ID:</label>
                        <input type="text" name="seekerID" value={formData.seekerID} onChange={handleChange} />

                        <button type="submit">Create Application</button>
                        </form>
                </div>
            }
        {searchform && <div>
            <div className='applications__filters'>
                <div className='filter'>
                <label htmlFor='filterInput'>Filter by:</label>
                <input id='filterInput' type='text'/>
                </div>
                <div className='buttons'>
                <button onClick={filterJob} className='btn btn-primary btn-lg'>Filter by Job Posting</button>
                <button onClick={filterSeeker} className='btn btn-primary btn-lg'>Filter by Job Seeker</button>
                <button onClick={filterCompany} className='btn btn-primary btn-lg'>Filter by Company</button>
                <button onClick={filterStatusCount} className='btn btn-primary btn-lg'>Filter by Status</button>
                <a onClick={clear}>Clear Filter</a>
                </div>
            </div>
            <div className='applications__table'>
                {applications.length > 0 &&
            <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='row'>Application ID</th>
                            <th scope='row'>dateApplied</th>
                            <th scope='row'>status</th>
                            <th scope='row'>jobListID</th>
                            <th scope='row'>seekerID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                        <tr key={index}>
                            <td scope='row'>{app.appID}</td>
                            <td scope='row'>{app.dateApplied}</td>
                            <td scope='row'>{app.status}</td>
                            <td scope='row'>{app.jobListID}</td>
                            <td scope='row'>{app.seekerID}</td>
                        </tr>))}
                    </tbody>
                </table>}
                {statusCount!=null && 
                    <div>
                        Count for status '{document.getElementById('filterInput').value}' is {statusCount.count}
                    </div>
                }
            </div> </div>}
        </div>
    )
}

export default Applications