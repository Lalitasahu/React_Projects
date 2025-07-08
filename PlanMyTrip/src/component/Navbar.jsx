import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <div className="logo">
            <Link to="/"> <img src="/triplan.png" alt="logo" /> </Link></div>
        
          <div className="sub-cont"><Link to="/">Home</Link></div>
          <div className="sub-cont"><Link to="/About">About</Link></div>
          <div className="sub-cont"><Link to="/Tours">Tours</Link></div>
          <div className="sub-cont"><Link to="/Destination">Destination</Link></div>
          <div className="sub-cont"><Link to="/Visa">Visa</Link></div>
          <div className="sub-cont"><Link to="/Hotel">Hotel</Link></div>
          <div className="sub-cont"><Link to="/Flights">Flights</Link></div>
          <div className="sub-cont"><Link to="/Contact">Contact</Link></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
