
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./form.css";

function OrderProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shipping_address, setShippingAddress] = useState("");
  const [delivery_date, setdelivery_date] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const today = new Date();
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    fetch(`http://localhost:8000/api/Product/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setPrice(data.price);
        setdelivery_date(sevenDaysLater.toISOString().split("T")[0]);
      });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      pro_id: product.id,
      user_id: user.username,
      quantity,
      shipping_address,
    };

    const response = await fetch(`http://localhost:8000/api/Order/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      navigate("/");
    } else {
      alert("Order failed");
    }
  };

  return (
    <div className="form-container">
      <h1>Order Product</h1>

      {product && (
        <>
          <h2>{product.title}</h2>
          <h3>Price: ₹{price}</h3>
          <h3>Delivery Date: {delivery_date}</h3>
          <h3>Order Date: {today}</h3>
          <h3>stock Date: {product.stock}</h3>
        </>
      )}

      <form onSubmit={submit}>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Shipping Address:</label>
          <input
            type="text"
            value={shipping_address}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn">Order</button>
          
        </div>
      </form>
    </div>
  );
}

export default OrderProduct;
 