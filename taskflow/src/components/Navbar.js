import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const user = { username: 'admin', is_superuser: true }; // Example user

  return (
    <nav>
      <Link to="/">Home</Link>
      {user?.is_superuser && <Link to="/create-user">
        <button>Create User</button></Link>
    }
      <Link to="/UserLogin">Login User</Link>
      <Link to="/CreateProject">Create Project</Link>
      <Link to="Addtask">Task</Link>
    </nav>

   
  );
}

export default Navbar;
