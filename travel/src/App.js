import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Destination from './pages/Destination';
import Visa from './pages/Visa';
import Hotel from './pages/Hotel';
import Flights from './pages/Flights';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;