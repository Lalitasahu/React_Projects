import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function AddProducts() {
    const{id} = useParams();
    const navigate = useNavigate();
    const[title,settitle] = useState("");
    // const[title,settitle] = useState("");
    // const[title,settitle] = useState("");

    useEffect(()=>{
        if(id) {
            fetch(`http://localhost:8000/api/Product/${id}/`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then((res)=> res.json())
            .then((data)=>{
                settitle(data.title);
                // settitle(data.title);
                // settitle(data.title);
            })
        }
    }, [id]);

    const submit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        // formData.append('title',title);
        // formData.append('title',title);

        const url = id 
        ? `http://localhost:8000/api/Product/${id}/` : `http://localhost:8000/api/Product/`;
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
            alert("Created Product successful!");
            navigate('/')
            } else {
            alert(" Updated Product Successful");
            }
        } else {
            alert("Failed to create Poroduct");
        } 
    };
    const Delete = async () => {
      const confirm = window.confirm("Are you sure you want to delete this Product?");
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
        <>
        <h1>{id ? "Edit" : "Add"} Product</h1>
        <form onClick={submit}>
            <label>Title:</label>
            <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            /><br /><br />
            <button type="submit">{id ? "Update" : "Submit"}</button>
            {id && (
            <button
            type="button"
            onClick={handleDelete}
            style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
            >
            Delete
            </button>
            )}
        </form>
        </>
    )
}

export default AddProducts;