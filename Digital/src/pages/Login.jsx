import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formData = { username, password };

    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      const { access } = result;

      // Save access token
      localStorage.setItem("access_token", access);

      const userRes = await fetch("http://localhost:8000/api/user/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        alert("Failed to fetch user data.");
      }

    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      alert("Invalid credentials.");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setusername(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />

      <button type="submit">Login</button>
    </form>
  );
}

export default UserLogin;
