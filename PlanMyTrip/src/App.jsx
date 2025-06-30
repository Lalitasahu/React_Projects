// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import Destination from "./pages/Destination";
import Hotel from "./pages/Hotel";
import Visa from "./pages/Visa";
import Blog from "./pages/Blog";
import Flights from "./pages/Flights";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Tours" element={<Tours />} />
          <Route path="/Destination" element={<Destination />} />
          <Route path="/Hotel" element={<Hotel />} />
          <Route path="/Visa" element={<Visa />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Flights" element={<Flights />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
