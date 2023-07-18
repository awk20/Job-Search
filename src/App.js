import React from "react"
import SearchBar from "./components/SearchBar"
import NavBar from "./components/NavBar"
import SavedJobs from "./components/SavedJobs"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/saved" element={<SavedJobs />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}