// src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <ul className="flex flex-wrap gap-4">
          <li><Link to="/" className="hover:text-sky-400">Home</Link></li>
          <li><Link to="/About" className="hover:text-sky-400">About</Link></li>
          <li><Link to="/Tours" className="hover:text-sky-400">Tours</Link></li>
          <li><Link to="/Destination" className="hover:text-sky-400">Destination</Link></li>
          <li><Link to="/Hotel" className="hover:text-sky-400">Hotel</Link></li>
          <li><Link to="/Visa" className="hover:text-sky-400">Visa</Link></li>
          <li><Link to="/Blog" className="hover:text-sky-400">Blog</Link></li>
          <li><Link to="/Flights" className="hover:text-sky-400">Flights</Link></li>
          <li><Link to="/Contact" className="hover:text-sky-400">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
