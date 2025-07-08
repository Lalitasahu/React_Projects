

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      setProducts(data.products || []);
      setCategories(data.categories || []);
      console.log("Products:", data.products);
      console.log("Categories:", data.categories);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">DIGITAL</h2>

      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>

        <Link className="nav-link" to="/AddToCart">
          <button className="nav-button">Add to Cart</button>
        </Link>

        <Link className="nav-link" to="/OrderHistory">
          <button className="nav-button">Orders</button>
        </Link>

        {localStorage.getItem("access_token") ? (
          <>
            <button className="nav-button username">
              {user?.username}
            </button>
            <Link className="nav-link" to="/">
              <button className="nav-button" onClick={logout}>Logout</button>
            </Link>
          </>
        ) : (
          <Link className="nav-link" to="/Login">
            <button className="nav-button">Login</button>
          </Link>
        )}

        {user?.is_vendor && (
          <>
            <Link className="nav-link" to="/AddProduct">
              <button className="nav-button">Add Product</button>
            </Link>
            <Link className="nav-link" to="/Usercreate">
              <button className="nav-button">Usercreate</button>
            </Link>
            <Link className="nav-link" to="/AddCat/add">
              <button className="nav-button">Add Category</button>
            </Link>
          </>
        )}

        <Link className="nav-link" to="/Profile">
          <button className="nav-button">User Profile</button>
        </Link>

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

          {(categories.length > 0 || products.length > 0) && (
            <div className="search-results">
              {categories.length > 0 && (
                <>
                  <h2>Matched Categories</h2>
                  <ul>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/Prolist/${cat.id}`}
                          onClick={() => {
                            setSearchTerm("");
                            setCategories([]);
                          }}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                </>
              )}

              {products.length > 0 && (
                <>
                  <h2>Matched Products</h2>
                      <ul>
                        {products.map((prod) => (
                          <li key={prod.id}>
                            <Link
                              to={`/ProDetail/${prod.id}`}
                              onClick={() => {
                                setSearchTerm("");
                                setProducts([]);
                              }}
                            >
                              {prod.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                </>
              )}
            </div>
          )}

          {searchTerm && products.length === 0 && categories.length === 0 && (
            <p className="no-results">No products or categories found.</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
