import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";


const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };
  
  return (
    <nav className="navbar">
      <h2 className="logo" >DIGITAL</h2>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        {/* <Link  to="//">Product Order History</Link> */}
        {/* <Link style={styles.link} to="/Usercreate">create user</Link> */}
        {/* <button><Link to = "/Usercreate/edit:id/" > Edit user infomation</Link></button> */}
        {/* <button><Link to = "/AddCat/add" >Add New Category</Link></button> */}
        {/* <button><Link to = "/AddProduct" >Add New Prodcut</Link></button> */}
        
        {/* {
          localStorage.getItem('access_token')?
          <button><Link  onClick={()=>logout()}>Logout</Link></button>:
          <button><Link style={styles.link} to="/Login">Login</Link></button>
        } */}
        {localStorage.getItem('access_token') ? (
          <>
          <button className="nav-button username"> {user?.username} </button>
          <button className="nav-button" > <Link className="nav-link"  onClick={() => logout()} > Logout </Link> </button>
          </>
        ) : (
          <button className="nav-button" > <Link className="nav-link"  to="/Login"> Login </Link> </button>
        )}

        {user?.is_vendor && (
        <>
          <Link  to="/AddProduct"><button className="nav-button" >Add Product</button></Link>
          <Link  to="/Usercreate"><button className="nav-button" >Usercreate</button></Link>
          <Link  to="/AddCat/add"><button className="nav-button" >Add Category</button></Link>
        </>
        )}

        <button className="nav-button" ><Link to = "/Profile" >User Profile </Link></button>
        
        
      </div>
    </nav>
  );
};

export default Navbar;
