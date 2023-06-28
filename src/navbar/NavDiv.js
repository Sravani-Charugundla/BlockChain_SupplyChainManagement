import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

const NavDiv = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#"><h1>UNIT-1 Requests</h1></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to = "/Components/Divisons/Divhome" className="nav-link navbar-link">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
  )
}

export default NavDiv;