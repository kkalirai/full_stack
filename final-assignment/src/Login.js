import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function checkLogin() {
    try {
      const data = { username, password };
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome Back!!</h1>
        <p>Connect, share your voice and make a difference.</p>
      </div>
      <div className="form-wrapper">
        <h2>Login</h2>
        <form action="" method="post">
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <button onClick={() => checkLogin()}>Login</button>
          <p style={{ color: "#828282" }}>
            Don't have an account?
            <Link to="/user/register">Create One</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
