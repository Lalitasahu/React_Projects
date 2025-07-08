import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formData = { username, password };

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Invalid credentials.");
        return;
      }

      const result = await response.json();
      const { access } = result;

      if (!access) {
        alert("Token not received.");
        return;
      }

      // Save access token to localStorage
      localStorage.setItem("access_token", access);
      console.log("Token saved:", access);

      // Fetch user data with token
      const userRes = await fetch("http://localhost:8000/api/user/me/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        console.log("User data:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        console.error("Failed to fetch user data.");
        alert("Failed to fetch user data.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default UserLogin;
