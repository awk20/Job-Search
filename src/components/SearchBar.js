import { useState, useEffect } from 'react'
import axios from "axios"

export default function SearchBar({savedJobs, setSavedJobs}) {
    // useState for fading in of text
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true)
        }, 100)
    }, []);

    // States to hold the job data frome the Adzuna API and 
    // to hold the keyword search terms as well
    const [jobs, setJobs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    // useState for determining minimum salary for job search
    const [minSalary, setMinSalary] = useState("")
    
    // useState for true/false for fulltime checkbox
    const [fullTime, setFullTime] = useState(true)

    // const object of States to switch between for State being searched in
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", 
                    "Colorado", "Conecticut", "Delaware", "Florida", "Georgia", 
                    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", 
                    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
                    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", 
                    "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
                    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
                    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
                    "South Dakota", "Tennessee" ,"Texas", "Utah", "Vermont", 
                    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

    // useState for selecting state to search for job in
    const [stateSelected, setStateSelected] = useState('');

    // Const variables for the url and key
    const apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/1"
    const apiKey = "ad4158df54e96a636f983b3a5ce1a300"
    const appId = "079dfac3"

    // Goes inside of axios.get()
    // `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=30&what=${searchTerms}&full_time=${fullTime}&sort_by=salary&salary_min=${minSalary}`

    // useEffect to run the keyword search everytime the keywords enetered 
    // into the input tag is changed
    useEffect(() => {
        // Set the API Key and API ID from Adzuna API as well as set 'what'
        // field to the search terms enetred in the input tag
        // Set state to the resuliting data from API call
        const searchJobs = async() => {
            try {
                const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=30&what=${searchTerms}&where=${stateSelected}&full_time=${fullTime}`)
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

    // Function to set the current US state we are looking for jobs in
    const handleStateChange = (event) => {
        setStateSelected(event.target.value)
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
                    prevSavedJobs.filter(selectedJob => selectedJob.id !== job.id)
            )
        }
    }

    // Render component by mapping job id and title to screen when search terms change
    return (
        <>
            <div className={`title-container ${fadeIn ? 'fadeIn' : ''}`}>
                <h1 className="title">Find Me Jobs</h1>
            </div>
            <div>
                <p className="app-desc">
                    Welcome to Find me Jobs. Enter keywords for the jobs you wish to see
                    and click the checbox on each job to save them on the saved jobs page on the
                    navigation bar. Click the job listing title to be directed to the page with the
                    desired job listing
                </p>
            </div>
            <div className="search-bar">
                <input className="search-bar-a" type="text" value={searchTerms} onChange={handleSearchChange} placeholder="Enter Jobs Key Terms"/>
            </div> 
            <br/>
            <div className="search-bar">
                <input className="search-bar-a" type="text" value={minSalary} onChange={handleMinSalaryChange} placeholder="Enter Salary Minimum"/>
            </div> 
            <div className="search-bar">
                <select className="state-choices"value={stateSelected} onChange={handleStateChange}>
                    <option value="">Select State to Search in</option>
                    {states.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="checkbox-wrapper-2">
                <input 
                    type="checkbox" 
                    id="fulltime"
                    class="sc-gJwTLC ikxBAC"
                    onChange={handleFullTimeChange}
                />
                <label className="full-time"for="fulltime">{fullTime ? '   Full-time' : '   Part-time'}</label>
            </div>
            <ul className="spaced-list">
                {jobs.map((job) => (
                    <li key={job.id}>
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                            {job.title}
                        </a>
                        <p className="desc-p">{job.description}</p>
                        <input 
                            type="checkbox"
                            onChange={event => handleAddJob(event, job)}
                        />
                        <p className="checkbox-desc">
                            Check Box to Save Job
                        </p>
                    </li>
                ))}
            </ul> 
        </>
    )
}