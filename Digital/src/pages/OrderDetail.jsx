// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const OrderHistory = () => {
//     const [order, setOrder] = useState(null);
//     const { id } = useParams();

//     const getOrder = async () => {
//         const token = localStorage.getItem("access_token");
//         const response = await fetch(`http://localhost:8000/api/Order/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             console.error("Failed to fetch order");
//             return;
//         }

//         const data = await response.json();
//         setOrder(data);
//         console.log(data);
//     };

//     useEffect(() => {
//         getOrder();
//     }, [id]);

//     return (
//         <div className="order-history">
//             <h1>Order Details</h1>
//             {order ? (
//                 <div>
//                     <img 
//                         src={order.product.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',')[0]} 
//                         alt={order.title} 
//                         style={{ width: '200px', height: '200px', borderRadius: '4px' }}
//                     />
//                     <h2>Order ID: {order.id}</h2>
//                     <p>Product Name: {order.product.title}</p>
//                     <p>Quantity: {order.quantity}</p>
//                     <p>Price: ₹{order.price}</p>
//                     <p>delivery_date: {new Date(order.booking_date).toLocaleDateString()}</p>
//                     <p>Shipping Address: {order.shipping_address}</p>
//                     <p>Status: {order.status}</p>
//                     <p>Total Amount: ₹{order.price*order.quantity}</p>


//                 </div>
//             ) : (
//                 <p>Loading order details...</p>
//             )}
//         </div>
//     );
// };

// export default OrderHistory;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);

  const fetchOrder = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`http://localhost:8000/api/Order/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setOrder(data);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const updateOrderStatus = async (status) => {
    const token = localStorage.getItem("access_token");
    const body = { status };
    if (status === "cancelled") {
      if (!cancellationReason) {
        alert("Please provide a cancellation reason.");
        return;
      }
      body.cancellation_reason = cancellationReason;
    }
  
    const res = await fetch(`http://localhost:8000/api/Order/${id}/update_status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchOrder(); // Refresh
    } else {
      alert(data.error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {order && (
        <>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Amount:</strong> ₹{order.price}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Address:</strong> {order.shipping_address}</p>
          {order.status === "cancelled" && (
            <p className="text-red-500"><strong>Reason:</strong>{order.cancellation_reason}</p>
          )}

          {order.status === "pending" && (
            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={() => updateOrderStatus("confirmed")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Order
              </button>

              {!showReasonInput ? (
                <button
                  onClick={() => setShowReasonInput(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Order
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <textarea
                    className="border p-2 rounded w-full"
                    rows="3"
                    placeholder="Enter cancellation reason..."
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                  />
                  <button
                    onClick={() => updateOrderStatus("cancelled")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Submit Cancellation
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetail;
