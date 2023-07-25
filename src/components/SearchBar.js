import { useState, useEffect } from 'react'
import axios from "axios"

export default function SearchBar({savedJobs, setSavedJobs}) {
    // States to hold the job data frome the Adzuna API and 
    // to hold the keyword search terms as well
    const [jobs, setJobs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    // useState for determining minimum salary for job search
    const [minSalary, setMinSalary] = useState("")
    
    // useState for true/false for fulltime checkbox
    const [fullTime, setFullTime] = useState(true)

    // Const variables for the url and key
    const apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/1"
    const apiKey = "ad4158df54e96a636f983b3a5ce1a300"
    const appId = "079dfac3"

    // Goes inside of acios.get()
    // `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=30&what=${searchTerms}&full_time=${fullTime}&sort_by=salary&salary_min=${minSalary}`

    // useEffect to run the keyword search everytime the keywords enetered 
    // into the input tag is changed
    useEffect(() => {
        // Set the API Key and API ID from Adzuna API as well as set 'what'
        // field to the search terms enetred in the input tag
        // Set state to the resuliting data from API call
        const searchJobs = async() => {
            try {
                const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=30&what=${searchTerms}&where=us&full_time=${fullTime}`)
                    /* apiUrl, {
                    params: {
                        app_id: appId,
                        app_key: apiKey,
                        results_per_page: 30,
                        what: searchTerms,
                        salary_min: minSalary
                    }
                })*/
                setJobs(response.data.results)
            } catch(error) {
                console.error(error)
            }
        }
        searchJobs()
    }, [searchTerms, minSalary, fullTime])

    // Function to set the search terms every time input tag is changed
    const handleSearchChange = (event) => {
        setSearchTerms(event.target.value)
    }

    // Function to set minimum salary search terms as input is changed
    const handleMinSalaryChange = (event) => {
        setMinSalary(event.target.value)
    }

    // Change fullTime btwn 1 (false) and 0 (true) accorindg to adzuna API docs
    const handleFullTimeChange = (event) => {
        setFullTime(!fullTime)
        console.log(fullTime)
    }

/*     // Testing function to see if it saves jobs to local storage
    const handleSavedData = () => {
        console.log("Saved jobs: ", savedJobs)
    } */

    // Function to handle adding saved jobs to the saved jobs array
    // Adds the saved jobs to local storage if box is checked
    const handleAddJob = (event, job) => {
        if(event.target.checked) {
            setSavedJobs(prevSavedJobs => [...prevSavedJobs, job])
            localStorage.setItem('dataKey', JSON.stringify(savedJobs))
        } else {
            setSavedJobs(prevSavedJobs =>
                    prevSavedJobs.filter(selectedjob => selectedjob.id !== job.id)
            )
        }
    }

    // Render component by mapping job id and title to screen when search terms change
    return (
        <>
            <div className="title-container">
                <h1 className="title">Job Listings</h1>
            </div>
            <div>
                <p className="app-desc">
                    Welcome to the Job listing site. Enter keywords for the jobs you wish to see
                    and click the checbox on each job to save them on the saved jobs page on the
                    navigation bar. 
                </p>
            </div>
            <div className="search-bar">
                <input type="text" value={searchTerms} onChange={handleSearchChange} placeholder="Enter Jobs Key Terms"/>
            </div> 
            <br/>
            <div className="search-bar">
                <input type="text" value={minSalary} onChange={handleMinSalaryChange} placeholder="Enter Salary Minimum"/>
            </div> 
            <div className="full-time-btn">
                <input 
                    type="checkbox" 
                    id="fulltime"
                    onChange={handleFullTimeChange}
                />
                <label for="fulltime">{fullTime ? 'Full-time' : 'Part-time'}</label>
            </div>
            <ul className="spaced-list">
                {jobs.map((job) => (
                    <li key={job.id}>
                        {/* <img src={job.logo_url} alt={job.company.display_name}></img> */}
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                            {job.title}
                        </a>
                        <p className="desc-p">{job.description}</p>
                        <input 
                            type="checkbox"
                            onChange={event => handleAddJob(event, job)}
                        />
                    </li>
                ))}
            </ul> 
        </>
    )
}