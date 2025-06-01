

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Productlist.css";

const Pro_detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Detail, setDetail] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1); 
    const [editingReviewId, setEditingReviewId] = useState(null);


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
                quantity:quantity > 0 ? quantity: 1,
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
        const response = await fetch(`http://localhost:8000/api/reviews_by_product_id/${id}`);
        const data = await response.json();
        setReviews(data);
    };

    // const handleReviewSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch("http://localhost:8000/api/Reviews/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //         },
    //         body: JSON.stringify({
    //             product: id,
    //             comment,
    //             rating,
    //         }),
    //     });

    //     if (response.ok) {
    //         alert("Review submitted!");
    //         setComment("");
    //         setRating(1);
    //         setShowReviewForm(false);
    //         getReviews();
    //     } else {
    //         alert("Failed to submit review.");
    //     }
    // };

    // const updatereview = async (reviewId) => {
    //     const response = await fetch(`http://localhost:8000/api/Reviews/${reviewId}/`, {
    //         method: "PUT",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             product: id,
    //             comment,
    //             rating,
    //         }),
    //     });
    
    //     if (response.ok) {
    //         alert("Review updated successfully!");
    //         setComment("");
    //         setRating(1);
    //         setShowReviewForm(false);
    //         getReviews();
    //     } else {
    //         const errorData = await response.json();
    //         console.error("Error updating review:", errorData);
    //         alert("Failed to update review.");
    //     }
    // };
    
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append("product", id); // Product ID
        formData.append("comment", comment);
        formData.append("rating", rating);
      
        const isUpdate = !!editingReviewId; // check if editing
        const url = isUpdate
          ? `http://localhost:8000/api/Reviews/${editingReviewId}/`
          : `http://localhost:8000/api/Reviews/`;
        const method = isUpdate ? "PUT" : "POST";
      
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        });
      
        if (response.ok) {
          alert(isUpdate ? "Updated Review Successfully" : "Submitted Review Successfully");
          setComment("");
          setRating(1);
          setEditingReviewId(null);
          setShowReviewForm(false);
          getReviews(); // if you want to reload reviews on the page
          navigate("/");
        } else {
          const err = await response.json();
          console.error("Review error:", err);
          alert("Failed to save Review");
        }
    };
      

    const ReviewDelete = async (id) => {
        const confirm = window.confirm(
          "Are you sure you want to delete this Review?"
        );
        if (!confirm) return;
    
        const response = await fetch(`http://localhost:8000/api/Reviews/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
    
        if (response.ok) {
          alert("Review deleted successfully");
          navigate("/");
        } else {
          alert("Failed to delete Review");
        }
    };
    useEffect(() => {
        getDetail();
        getReviews();
    }, [id]);

    if (!Detail) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{Detail.title}</h1>
            <div className="product-details">
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
            </div>

            <div className="product-images">
                {Detail.image_list &&
                    Detail.image_list
                        .replace('[', '')
                        .replace(']', '')
                        .replace(/'/g, '')
                        .split(',')
                        .map((e, index) => (
                            <img
                                key={index}
                                src={e.trim()}
                                alt="Product"
                            />
                        ))}
            </div>


            <div className="button-group">
                
                <button
                    type="button"
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1);
                        }
                    }}
                >
                    -
                </button>

                <span style={{ margin: '0 10px' }}>{quantity}</span>

                <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                >
                    +
                </button>

                <Link to={`/AddProduct/edit/${id}`}>
                    <button type="button">Edit</button>
                </Link>

                {
                    Detail.is_in_cart ? (
                        <button type="button" disabled>Already in cart</button>
                    ) : (
                        <button type="button" onClick={handleAddToCart}>Add to Cart</button>
                    )
                }

                <Link to={`/Order_Product/${id}`}>
                    <button type="button">Order</button>
                </Link>
            </div>



            <h2>Customer Reviews</h2>
            <button onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? "Cancel Review" : "Review"}
            </button>

            {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="review-form">
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
                <div key={review.id} className="review-item">
                <p><strong>{review.user_name}</strong> rated {review.rating}/5</p>
                <p>{review.comment}</p>

                <button
                    onClick={() => {
                    setEditingReviewId(review.id);
                    setComment(review.comment);
                    setRating(review.rating);
                    setShowReviewForm(true);
                    }}
                >
                    Edit
                </button>

                <button onClick={() => ReviewDelete(review.id)}>
                    Delete
                </button>

                {/* ✅ Conditionally render form below this review only if editing */}
                {editingReviewId === review.id && showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="edit-review-form">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                    />
                    <button type="submit">Update</button>
                    <button
                        type="button"
                        onClick={() => {
                        setEditingReviewId(null);
                        setShowReviewForm(false);
                        setComment("");
                        setRating(1);
                        }}
                    >
                        Cancel
                    </button>
                    </form>
                )}
                </div>
            ))
            ) : (
            <p>No reviews yet.</p>
            )}

        </div>
    );
};

export default Pro_detail;
