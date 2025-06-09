
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/ProductSearchListAPIView/?search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data.results || []); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DIGITAL</h2>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>

        <button className="nav-button">
          <Link className="nav-link" to="/AddToCart">Add to Cart</Link>
        </button>

        <button className="nav-button">
          <Link className="nav-link" to="/OrderHistory">Oders</Link>
        </button>

        {localStorage.getItem("access_token") ? (
          <>
            <button className="nav-button username">
              {user?.username}
            </button>
            <button className="nav-button" onClick={logout}>
              <Link className="nav-link" to="/">Logout</Link>
            </button>
          </>
        ) : (
          <button className="nav-button">
            <Link className="nav-link" to="/Login">Login</Link>
          </button>
        )}

        {user?.is_vendor && (
          <>
            <Link to="/AddProduct">
              <button className="nav-button">Add Product</button>
            </Link>
            <Link to="/Usercreate">
              <button className="nav-button">Usercreate</button>
            </Link>
            <Link to="/AddCat/add">
              <button className="nav-button">Add Category</button>
            </Link>
          </>
        )}

        <button className="nav-button">
          <Link to="/Profile">User Profile</Link>
        </button>

        <div className="product-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          {/* <button onClick={handleSearch}>Search</button> */}

          {searchTerm && products.length > 0 && (
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/ProDetail/${product.id}`} onClick={() => setSearchTerm("")}>
                    <h4>{product.title}</h4>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {searchTerm && products.length === 0 && (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
