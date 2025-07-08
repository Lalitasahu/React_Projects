import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">TravelGuide</div>
      
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/tours" onClick={() => setIsOpen(false)}>Tours</Link>
        <Link to="/destination" onClick={() => setIsOpen(false)}>Destination</Link>
        <Link to="/visa" onClick={() => setIsOpen(false)}>Visa</Link>
        <Link to="/hotel" onClick={() => setIsOpen(false)}>Hotel</Link>
        <Link to="/flights" onClick={() => setIsOpen(false)}>Flights</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;