import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./form.css";

function AddProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, settitle] = useState("");
  const [cat, setcat] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const User = JSON.parse(userData);
      setUser(User);

      if (!User.is_vendor) {
        alert("Access denied. Only vendors can add or edit products.");
        navigate("/");
      }
    } else {
      alert("Please login first.");
      navigate("/Login");
    }

    if (id) {
      fetch(`http://localhost:8000/api/Product/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          settitle(data.title);
        });
    }
  }, [id, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    const url = id
      ? `http://localhost:8000/api/Product/${id}/`
      : `http://localhost:8000/api/Product/`;
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert(
        id ? "Updated Product Successfully" : "Created Product Successfully"
      );
      navigate("/");
    } else {
      alert("Failed to save Product");
    }
  };

  const Delete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Product?"
    );
    if (!confirm) return;

    const response = await fetch(`http://localhost:8000/api/Product/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (response.ok) {
      alert("Product deleted successfully");
      navigate("/");
    } else {
      alert("Failed to delete Product");
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Edit" : "Add"} Product</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label>Category ID:</label>
          <input
            type="text"
            value={cat}
            onChange={(e) => setcat(e.target.value)}
          />
        </div> */}

        <div className="form-group">
          <button type="submit" className="submit-btn">
            {id ? "Update" : "Submit"}
          </button>

          {id && (
            <button type="button" onClick={Delete} className="delete-btn">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
