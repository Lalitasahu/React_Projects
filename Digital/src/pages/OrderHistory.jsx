import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./OrderHistory.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getOrders = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`http://localhost:8000/api/Order/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch orders");
                return;
            }

            const data = await response.json();
            setOrders(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const cancelOrder = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );
        console.log("Delete Order ID:", id);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/Order/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.ok) {
                alert("Order deleted successfully");
                getOrders(); // Refresh the order list
            } else {
                alert("Failed to delete order");
            }
        } catch (error) {
            alert("An error occurred while deleting the order.");
            console.error("Delete error:", error);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
            getOrders();
        }
    }, []);

    return (
        <div className="order-history">
            {Array.isArray(orders.results) && orders.results.length > 0 ? (
                <>
                    <div className="order-history-header">
                        <h2>Welcome, {user?.username}! Your Order History</h2>
                        <p>Here are your past orders:</p>
                    </div>
                    <ul>
                        {orders.results.map((order, index) => (
                            <li key={index}>
                                <img 
                                    src={order.product.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',')[0]} 
                                    alt={order.title} 
                                    style={{ width: '200px', height: '200px', borderRadius: '4px' }}
                                />
                                <h2>Order ID: {order.id}</h2>
                                <p>Price: {order.price}</p>
                                <p>Quantity: {order.quantity}</p>
                                <p>Shipping Address: {order.shipping_address}</p>
                                <p>Product: {order.product.title}</p>
                                {/* <p>Order Date: {new Date(order.date).toLocaleDateString()}</p> */}
                                {/* <p>Delivery Date: {new Date(order.delivery_date).toLocaleDateString()}</p> */}
                                {/* <p>Date: {new Date(order.date).toLocaleDateString()}</p> */}
                                <p>Total Amount: ₹{order.price * order.quantity}</p>
                                <Link to={`/OrderDetail/${order.id}`}>View Details</Link>
                                <button onClick={() => cancelOrder(order.id)}>
                                    Cancel Order
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                // <p>No orders found.</p>
                <h1> No Orders here Go to Online shopping </h1>
            )}
        </div>
    );
};

export default OrderHistory;
