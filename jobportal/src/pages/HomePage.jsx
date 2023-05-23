import React from 'react';

function HomePage() {
    return ( 
        <div className='home__page'>
            <span className='title'> Welcome to our Job Portal! </span>
            <div className='home__body'>
                In this website, a user is able to take on multiple tasks: 
                <ol>
                    <li> View all our Job Seekers and filter them however they see fit</li>
                    <li> View all our Job Listings and filter them however they see fit</li>
                    <li> View all our Employers and filter them however they see fit</li>
                    <li> Add new Job Seekers and their information</li>
                    <li> Add new Job Listings and their information</li>
                    <li> Add new Employers and their information</li>
                    <li> Have Job Seekers apply to Job Listings</li>
                </ol>
            </div>
        </div>)
}

export default HomePage

