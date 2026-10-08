import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // IMPORTANT

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // create navigate

  const handleLogin = () => {

    fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {

      if (data.user) {

        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/admin/dashboard");   // redirect after login

      } else {
        alert("Invalid login");
      }

    })
    .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="form-control mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}



export default Login;