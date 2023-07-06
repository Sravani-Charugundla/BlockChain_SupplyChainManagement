import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to="/" className="navbar-brand"><h1>Home</h1></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link navbar-link">LogIn</Link>
          </li>
          <li className="nav-item">
            <Link to="/Authenticate/Signup" className="nav-link navbar-link">SignUp</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
