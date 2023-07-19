import React from 'react'
import NavBar from './NavBar'
import { useEffect } from 'react'

export default function SavedJobs({ savedJobs, setSavedJobs}) {
    return (
        <>
            <div>
            <p>Saved Jobs</p>
                <ul>
                    {savedJobs.map(job => (
                        <li key={job.id}>
                            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                                {job.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}