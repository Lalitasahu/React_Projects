// components/Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>DIGITAL</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/Usercreate">create user</Link>
        <Link style={styles.link} to="/Login">Login</Link>
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
