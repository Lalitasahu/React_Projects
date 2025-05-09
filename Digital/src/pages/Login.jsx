import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom"

function userlogin() {
    const[username, setusername] = useState("")
    const[password, setpassword] = useState("")
    const navigate = useNavigate()

    const submit = async(e) =>{
        e.preventDefault();

    const formData = {
        username,
        password,      
    }

    const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    
        })
        if(response.ok) {
            const result = await response.json();
            const { access } = result;
      
            localStorage.setItem('access_token', access);
            navigate('/');
      
        } else {
            const errorData = await response.json();
            console.error("Error",errorData)
            alert("Failed to login. ")
        }
    }
    return (

        <form onSubmit={submit}>
          <h2>Login</h2>
    
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          ></input>
    
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          ></input>
    
          <button type="Submit">Login</button>
    
        </form>
    )
    
}
export default userlogin;