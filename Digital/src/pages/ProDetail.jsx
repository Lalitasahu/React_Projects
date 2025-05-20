
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Pro_detail = () => {
    const { id } = useParams();
    const [Detail, setDetail] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);

    const getDetail = async () => {
        const response = await fetch(`http://localhost:8000/api/Product/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        const contentType = response.headers.get("content-type");
        const text = await response.text();

        if (contentType && contentType.includes("application/json")) {
            const data = JSON.parse(text);
            setDetail(data);
        } else {
            console.error("Expected JSON but got:", contentType);
        }
    };

    const handleAddToCart = async () => {
        const response = await fetch("http://localhost:8000/api/Cart/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                product: id,
                quantity: 1,
            }),
        });

        if (response.ok) {
            alert("Added to cart!");
            getDetail();
        } else {
            alert("Already in cart");
        }
    };

    const getReviews = async () => {
        const response = await fetch("http://localhost:8000/api/Reviews/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        const data = await response.json();

        const reviewsList = Array.isArray(data) ? data : data.results;
    
        const productReviews = reviewsList.filter((review) => review.product === parseInt(id));
        setReviews(productReviews);
    };
    
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/Reviews/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                product: id,
                comment,
                rating,
            }),
        });

        if (response.ok) {
            alert("Review submitted!");
            setComment("");
            setRating(1);
            setShowReviewForm(false);
            getReviews();
        } else {
            alert("Failed to submit review.");
        }
    };

    useEffect(() => {
        getDetail();
        getReviews();
    }, [id]);

    if (!Detail) return <p>Loading...</p>;

    return (
        <div>
            <h1>{Detail.title}</h1>
            <p>Price: {Detail.price}</p>
            <p>Category Name: {Detail.category_name}</p>
            <p>Stock: {Detail.stock}</p>
            <p>Is Available: {Detail.is_available ? "Yes" : "No"}</p>
            <p>Model Name: {Detail.model_name}</p>
            <p>Description: {Detail.description}</p>
            <p>Battery Backup: {Detail.battery_backup}</p>
            <p>Screen Size: {Detail.screen_size}</p>
            <p>Warranty: {Detail.warranty_summary}</p>
            <p>Keyboard: {Detail.keyboard}</p>
            <p>RAM: {Detail.ram}</p>
            <p>Part Number: {Detail.part_number}</p>
            <p>Power Supply: {Detail.power_supply}</p>
            <p>OS: {Detail.operating_system}</p>
            <p>SSD: {Detail.ssd_capacity}</p>
            <p>Weight: {Detail.weight}</p>

            {
                Detail.image_list &&
                Detail.image_list
                    .replace('[', '')
                    .replace(']', '')
                    .replace(/'/g, '')
                    .split(',')
                    .map((e, index) => (
                        <img
                            key={index}
                            src={e.trim()}
                            style={{ width: "150px", height: "auto", borderRadius: "8px" }}
                            alt="Product"
                        />
                    ))
            }

            {/* <hr /> */}
            <div>
                <button><Link to={`/AddProduct/edit/${id}`}>Edit</Link></button>
                {
                    Detail.is_in_cart ? (
                        <button className="submit-btn" disabled>Already in cart</button>
                    ) : (
                        <button type="button" onClick={handleAddToCart} className="submit-btn">Add to Cart</button>
                    )
                }
                <button><Link to={`/Order_Product/${id}`}>Order</Link></button>
            </div>

            {/* <hr /> */}
            <h2>Customer Reviews</h2>
            <button onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? "Cancel Review" : "Review"}
            </button>

            {showReviewForm && (
                <form onSubmit={handleReviewSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        required
                    /><br />
                    <label>
                        Rating:
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            {[1, 2, 3, 4, 5].map((val) => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </label><br />
                    <button type="submit">Submit Review</button>
                </form>
            )}

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} >
                        <p><strong>{review.user_name}</strong> rated {review.rating}/5</p>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
            {/* {reviews.map((e) => (
                <div key={e.id}>
                    <p><strong>{e.user_name}</strong> rated {e.rating}/5</p>
                    <p>{e.comment}</p>
                </div>
            ))} */}

        </div>
    );
};

export default Pro_detail;
