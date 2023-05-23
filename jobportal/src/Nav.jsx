import { useCallback, useState } from "react";
import { useNavigate } from 'react-router';
import React from 'react'

export const Nav = () => {

    return (
        <div>
            <nav class="navbar navbar-dark bg-primary navbar-expand-lg">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/jobseekers">Job Seekers</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/joblistings">Job Listings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/companies">Companies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/applications">Applications</a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )

}
