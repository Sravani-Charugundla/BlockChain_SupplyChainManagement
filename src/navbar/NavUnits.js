import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './navbar.css';

const NavUnits = () => {
    var unit_name = localStorage.getItem('store_uni');

    var div_name = localStorage.getItem('store_div');
    console.log(div_name);
    function convertToPascalCase(variable) {
        // Remove whitespace and special characters
        variable = variable.replace(/\s+/g, "").replace(/[_-]/g, "");

        // Capitalize the first letter of the variable and convert the rest to lowercase
        variable = variable.charAt(0).toUpperCase() + variable.slice(1).toLowerCase();

        return variable;
    }

    // Example usage

    var pascalCase_Uname = convertToPascalCase(unit_name);
    var pascalCase_Dname = convertToPascalCase(div_name);
    console.log(pascalCase_Uname);
    const handlelogout = () => {
        window.history.replaceState(null, '', '/');
        Navigate('/');
        localStorage.removeItem('store_uni');
        localStorage.removeItem('store_div');
        
        

    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/Components/Units/AllReq" className="nav-link navbar-link">All Requests</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Components/Units/UniAcptReq" className="nav-link navbar-link">AcceptedRequests</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/Components/Units/OpReq" className="nav-link navbar-link">Open Requests</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/" className="nav-link navbar-link" onClick={handlelogout}>Logout</Link>
                    </li>

                </ul>
                
            </div>
            <div className="d-flex justify-content-end">
                    <a className="navbar-brand">
                        <h3>{pascalCase_Uname} {pascalCase_Dname}</h3>
                    </a>
                </div>
        </nav>

    )
}

export default NavUnits