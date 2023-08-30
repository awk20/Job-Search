import React from 'react'

export default function SavedJobs({ savedJobs, setSavedJobs}) {
    return (
        <>
            <div>
            <div className="title-container">
                <h1 className="title">Saved Jobs</h1>
            </div>
                <ul className="spaced-list">
                    {savedJobs.map(job => (
                        <li key={job.id}>
                            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                                {job.title}
                            </a>
                            <p className="desc-p">{job.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}