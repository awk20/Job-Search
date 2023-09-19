import React from 'react'

export default function SavedJobs({ savedJobs, setSavedJobs}) {

    const handleRemoveJob = (event, job) => {
        if(event.target.checked) {
            setSavedJobs(prevSavedJobs => [...prevSavedJobs, job])
            localStorage.setItem('dataKey', JSON.stringify(savedJobs))
        } else {
            setSavedJobs(prevSavedJobs =>
                    prevSavedJobs.filter(selectedjob => selectedjob.id !== job.id)
            )
            localStorage.setItem('dataKey', JSON.stringify(savedJobs.filter(selectedJob => selectedJob.id !== job.id)))
        }
    }

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
                            <input 
                                type="checkbox"
                                onChange={event => handleRemoveJob(event, job)}
                            />
                            <p className="checkbox-desc">Remove Job</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}