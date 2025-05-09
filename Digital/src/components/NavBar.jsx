// components/Navbar.js
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {


  const logout = ()=>{
    localStorage.removeItem('access_token')
  }

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>DIGITAL</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/Usercreate">create user</Link>
        {/* <button><Link to = "/Usercreate/edit:id/" > Edit user infomation</Link></button> */}
        {
          localStorage.getItem('access_token')?
          <button><Link  onClick={()=>logout()}>Logout</Link></button>:
          <button><Link style={styles.link} to="/Login">Login</Link></button>
        }
        <button><Link to = "/AddCat/add" >Add New Category</Link></button>
        <button><Link to = "/AddProduct" >Add New Prodcut</Link></button>
        <button><Link to = "/Profile" >User Profile </Link></button>
        
        
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  }
};

export default Navbar;
