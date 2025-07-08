import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Createuser from './pages/Createuser';
import UserLogin from './pages/UserLogin';
import CreateProject from './pages/CreateProject';
import Addtask from './pages/Addtask';
import AddComment from './pages/AddComment';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<Createuser />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/CreateProject" element={<CreateProject />} />
        <Route path="/Addtask" element={<Addtask />} />
        <Route path="/AddComment" element={<AddComment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
