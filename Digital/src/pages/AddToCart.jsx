import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    const getCartItems = async () => {
        const token = localStorage.getItem("access_token");

        const response = await fetch(`http://localhost:8000/api/Cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch cart items");
            return;
        }

        const data = await response.json();
        const itemsWithQuantities = data.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(itemsWithQuantities);
    };
    const updateCartQuantity = async (itemId, newQuantity) => {
        const token = localStorage.getItem("access_token");
    
        try {
            const response = await fetch(`http://localhost:8000/api/Cart/${itemId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to update cart item");
            }
    
            getCartItems();
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };
    
    useEffect(() => {
        getCartItems();
    }, []);

    const deleteCart = async (id) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this Cart?"
        );
        console.log("Delete Cart ID:", id);
        if (!confirmDelete) return;
      
        try {
          const response = await fetch(`http://localhost:8000/api/Cart/${id}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
      
          if (response.ok) {
            alert("Cart deleted successfully");
            navigate("/");
          } else {
            alert("Failed to delete Cart");
          }
        } catch (error) {
          alert("An error occurred while deleting the cart.");
          console.error("Delete error:", error);
        }
      };
      
    
    return (
        <>
            <h2>Cart Items</h2>
            <div>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id}>
                            <h3>Cart ID: {item.id}</h3>
                            <h3>User: {item.user}</h3>
                            <h3>Product: {item.product.title}</h3>
                            <h3>Price: ${item.product.price}</h3>
                            <h3>Date: {item.date}</h3>
                            <img
                                src={item.product.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',')[0]}
                                alt={item.title}
                                style={{
                                    width: '200px',
                                    height: '300px',
                                    borderRadius: '4px'
                                }}
                            /><br />

                            <label>
                                {/* <button
                                    type="button" onClick={() => setCartItems(prev => prev.map(i => i.id === item.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
                                            ))}
                                > -</button> */}

                                {/* <span style={{ margin: '0 10px' }}>{item.quantity}</span> */}

                                {/* <button
                                    type="button" onClick={() => setCartItems(prev => prev.map(i => i.id === item.id? { ...i, quantity: i.quantity + 1 } : i
                                            ))}
                                > +</button> */}
                                
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (item.quantity > 1) {
                                            updateCartQuantity(item.id, item.quantity - 1);
                                        }
                                    }}
                                > -</button>

                                <span style={{ margin: '0 10px' }}>{item.quantity}</span>

                                <button
                                    type="button"
                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                > +</button>

                            </label>

                            <button><Link to={`/Order_Product/${item.product.id}/`}>Order</Link></button>
                            
                            
                            <button onClick={() => {
                                deleteCart(item.id);
                            }}>
                            Delete
                            </button>

                            

                        </div>
                    ))
                ) : (
                    <p>No items in cart.</p>
                )}
                
                <h2>Total Price: ${totalPrice}</h2>
                
                <button><Link to={'/OrderAllItem/'}>Buy All Items </Link></button>
            </div>
        </>
    );
}

export default Cart;
