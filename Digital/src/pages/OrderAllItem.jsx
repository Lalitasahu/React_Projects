import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const BuyAllProducts = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);  


  useEffect(() => {
      const total = cartItems.reduce((acc, item) => {
          const rawPrice = item.product.price; // e.g., "₹74,999"
          const numericPrice = Number(rawPrice.replace(/[^\d.]/g, '')); // Removes ₹ and commas
          const quantity = Number(item.quantity);
          return acc + (numericPrice * quantity);
      }, 0);
      setTotalPrice(total);
  }, [cartItems]);  

  // Fetch cart items from backend when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/Cart/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        console.log("Cart API Response:", data);
    
        if (Array.isArray(data.results)) {
          setCartItems(data.results);
        } else {
          // console.error("Cart data is not an array:", data);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };    
  
    fetchCartItems();
  }, []);
  

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/BuyAllProductsCreateView/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shipping_address: shippingAddress
        })
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setCartItems([]);
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Failed to place order.");
      }
    } catch (error) {
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div>
      <h2>Buy All Products</h2>

      <textarea
        placeholder="Enter your shipping address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
      />

      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            Product: {item.product.title} | Price: ₹{item.product.price} | Quantity: {item.quantity}
          </li>
        ))}
      </ul>


      <button onClick={handleOrderSubmit}>Place Order</button>

      {message && <p>{message}</p>}

      {/* <h4>Total: ₹ */}
      <h2>Total Price: ${totalPrice}</h2>
        {/* {cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)} */}
      {/* </h4> */}

    </div>
  );
};

export default BuyAllProducts;
