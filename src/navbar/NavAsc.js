import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavAsc = () => {
    const location = useLocation();
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#"><h1>Division-1 Requests</h1></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to = "/aschome " className="nav-link navbar-link">Dashboard</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to = "/Components/ASC/SendDiv " className="nav-link navbar-link">BroadcastedRequests</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
    </div>
  )
}

export default NavAsc;