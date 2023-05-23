import React, { useState , useEffect} from 'react';
import axios from 'axios';

function Companies() {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/companies`);
            console.log(response.data)
            setCompanies(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);


      async function filter(){
        const filter = document.getElementById('filterInput')
        try {
            const response = await axios.get(`http://localhost:5000/company_by_location/${filter.value}`);
            console.log(response.data)
            setCompanies([response.data]);
            } catch (error) {
            console.log(error);
            clear()
        }}

      // TODO:
      async function clear(){
        document.getElementById('filterInput').value=''
        try {
            const response = await axios.get(`http://localhost:5000/companies`);
            console.log(response.data)
            setCompanies(response.data);
          } catch (error) {
            console.log(error);
          }
      }

    return ( 
        <div className='companies'>
            <div className='companies__title'>
                <h1 className='mt-4 text-primary'>Comapanies</h1>
            </div>
            <div className='companies__filters'>
                <label htmlFor='filterInput'>Filter by:</label>
                <input id='filterInput' type='text'/>
                <button onClick={filter} className='btn btn-primary btn-lg'>Filter by Location</button>
                <a onClick={clear}>Clear Filter</a>
            </div>
            <div className='companies__table'>
            <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='row'>Company Name</th>
                            <th scope='row'>Email Address</th>
                            <th scope='row'>Address</th>
                            <th scope='row'>Industry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company, index) => (
                        <tr key={index}>
                            <td>{company.employerName}</td>
                            <td>{company.email}</td>
                            <td>{company.address}</td>
                            <td>{company.industry}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Companies