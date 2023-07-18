import React from 'react'
import { Link } from'react-router-dom'

export default function NavBar() {
    return (
        <div className="nav-bar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Search Page</Link>
                    </li>
                    <li>
                        <Link to="/saved">Saved Jobs</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}