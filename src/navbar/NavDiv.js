import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import './navbar.css';

const NavDiv = () => {

    var loc_uni = localStorage.getItem('Unit_name');
    const handlelogout = () => {
        window.history.replaceState(null, '', '/');
        Navigate('/');
        localStorage.removeItem('Unit_name');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/Components/Divisions/DU1" className="nav-link navbar-link">Dashboard</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Components/Divisions/SendUnits" className="nav-link navbar-link">BroadcastedRequests</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Components/Divisions/SendASC" className="nav-link navbar-link">SentToASC</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/" className="nav-link navbar-link" onClick={handlelogout}>Logout</Link>
                    </li>
                </ul>
            </div>
            <div className="d-flex justify-content-end">
                <a className="navbar-brand" href="#"><h3>{loc_uni} Requests</h3></a>
            </div>
        </nav>
    )
}

export default NavDiv;