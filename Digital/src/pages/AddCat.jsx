import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      if (id) {
      fetch(`http://localhost:8000/api/Category/${id}/`, {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
        setName(data.name);
        // setName(data.image);
        })
          
      }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const url = id
      ? `http://localhost:8000/api/Category/${id}/`
      : "http://localhost:8000/api/Category/";
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });
    if (response.ok) {
      if (method=="POST"){
        alert("Category created successful!");
        navigate('/')
      } else {
        alert("Category Updated Successful");
      }
    } else {
      alert("Failed to create category");
    } 
  };

  const Delete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    const response = await fetch(`http://localhost:8000/api/Category/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (response.ok) {
      alert("Category deleted successfully");
      navigate("/");
    } else {
      alert("Failed to delete category");
    }
  };

  return (
    <>
      <h1>{id ? "Edit" : "Add"} Category</h1>
      <form onSubmit={submit}>
        <label>Category Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <br />

        {/* <button type="submit">Submit</button> */}
        <button type="submit" style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }}>{id ? "Update" : "Submit"}</button>
        
        {id && (
        <button type="button" onClick={Delete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete
        </button>
        )}
      </form>
    </>
    );
}

export default AddCategory;