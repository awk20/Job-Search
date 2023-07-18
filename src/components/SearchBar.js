import react from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import NavBar from './NavBar'

export default function SearchBar() {
    // States to hold the job data frome the Adzuna API and 
    // to hold the keyword search terms as well
    const [jobs, setJobs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    // useEffect to run the keyword search everytime the keywords enetered 
    // into the input tag is changed
    useEffect(() => {
        // Set the API Key and API ID from Adzuna API as well as set 'what'
        // field to the search terms enetred in the input tag
        // Set state to the resuliting data from API call
        const searchJobs = async() => {
            try {
                const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=079dfac3&app_key=ad4158df54e96a636f983b3a5ce1a300&results_per_page=20&what=${searchTerms}`)
                setJobs(response.data.results)
            } catch(error){
                console.error(error)
            }
        }
        searchJobs()
    }, [searchTerms])

    // function to set the search terms every time input tag is changed
    const handleSearch = (event) => {
        setSearchTerms(event.target.value)
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
            <div className="save-jobs-btn">
                <button>Save Jobs</button>
            </div>
             <ul className="spaced-list">
                {jobs.map((job) => (
                    <li key={job.id}>
                        <img src={job.logo_url} alt={job.company.display_name}></img>
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                            {job.title}
                        </a>
                        <input type="checkbox"/>
                    </li>
                ))}
            </ul> 
        </>
    )
}