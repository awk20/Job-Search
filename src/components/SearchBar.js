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
    const [fullTime, setFullTime] = useState(1)

    // useEffect to run the keyword search everytime the keywords enetered 
    // into the input tag is changed
    useEffect(() => {
        // Set the API Key and API ID from Adzuna API as well as set 'what'
        // field to the search terms enetred in the input tag
        // Set state to the resuliting data from API call
        const searchJobs = async() => {
            try {
                const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=30&what=${searchTerms}&full_time=${fullTime}`)
                setJobs(response.data.results)
            } catch(error) {
                console.error(error)
            }
        }
        searchJobs()
    }, [searchTerms, minSalary])

    // Function to set the search terms every time input tag is changed
    const handleSearch = (event) => {
        setSearchTerms(event.target.value)
    }

    // Function to set minimum salary search terms as input is changed
    const handleMinSalary = (event) => {
        setMinSalary(event.target.value)
    }

    // Change fullTime btwn 1 (false) and 0 (true) accorindg to adzuna API docs
    const handleFullTimeChange = () => {
        if(fullTime === 1) {
            setFullTime(0)
        }else if(fullTime === 0){
            setFullTime(1)
        }
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
            <div className="search-bar">
                <input type="text" value={searchTerms} onChange={handleSearch} placeholder="Enter Jobs Key Terms"/>
            </div> 
            <br/>
            <div className="search-bar">
                <input type="text" value={minSalary} onChange={handleMinSalary} placeholder="Enter Salary Minimum"/>
            </div> 
            <div>
                <input 
                    type="checkbox" 
                    id="fulltime"
                    onChange={handleFullTimeChange}
                />
                <label for="fulltime">Fulltime</label>
            </div>
            <ul className="spaced-list">
                {jobs.map((job) => (
                    <li key={job.id}>
                        <img src={job.logo_url} alt={job.company.display_name}></img>
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                            {job.title}
                        </a>
                        <p>{job.description}</p>
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