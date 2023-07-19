import React from "react"
import SearchBar from "./components/SearchBar"
import NavBar from "./components/NavBar"
import SavedJobs from "./components/SavedJobs"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  // State to hold the data of each saved job
  // Passed down from App.js to allow SearchBar.js and Savedjobs.js to acess the saved items
  const [savedJobs, setSavedJobs] = useState([])

  // useEffect to get the saved jobs from local storage 
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('dataKey'))
    if(savedJobs) {
        setSavedJobs(savedJobs)
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchBar savedJobs={savedJobs} setSavedJobs={setSavedJobs}/>} />
        <Route path="/saved" element={<SavedJobs savedJobs={savedJobs} setSavedJobs={setSavedJobs}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}