import './App.css';
import { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage'
import JobSeekers from './pages/JobSeekers'
import JobListings from './pages/JobListings';
import Companies from './pages/Companies';
import AddJobListing from './pages/AddJobListing';
import EditJobListing from './pages/EditJobListing'
import AddJobSeeker from './pages/AddJobSeeker';
import ViewJobListing from './pages/ViewJobListing';
import EditJobSeeker from './pages/EditJobSeeker'
import ViewJobSeeker from './pages/ViewJobSeeker'
import Applications from './pages/Applications';
import { Nav } from './Nav';

function App() {
    return (
        <div>
        
        <Router>
        
            <Nav /> 
            
            <div className="App">
                <Routes> 
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/joblistings" element={<JobListings />} />
                    <Route exact path="/jobseekers" element={<JobSeekers />} />
                    <Route exact path="/companies" element={<Companies />} />
                    <Route exact path="/addjoblisting" element={<AddJobListing />} />
                    <Route exact path = "/edit_job_listing/:id" element={<EditJobListing/>} />
                    <Route exact path = "/addjobseeker" element={<AddJobSeeker/>} />
                    <Route exact path = "/edit_job_seeker/:id" element={<EditJobSeeker/>} />
                    <Route exact path = "/viewjoblisting/:id" element={<ViewJobListing/>} />
                    <Route exact path = "/viewjobseeker/:id" element={<ViewJobSeeker/>} />
                    <Route exact path = "/applications" element={<Applications />} />
                </Routes>
            </div>
        </Router>
        </div>    
    );
}

export default App;