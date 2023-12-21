import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function checkLogin() {
    try {
      const data = { username: username, password: password };
      console.log("username", data);
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", response);
      if (response.status === 200) {
        Cookies.set("auth_token", result.auth_token, { expires: 7, path: "/" });
        navigate("/user/dashboard");
      } else {
        alert("Something went wrong, Please log in again.");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, Please log in again.");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <>
      <div
        className="container"
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          maxWidth: "700px",
          padding: "20px",
        }}
      >
        <div
          className="hero"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "5px 0 0 5px",
          }}
        >
          <h1>Welcome Back!!</h1>
          <p>Connect, share your voice and make a difference.</p>
        </div>
        <div
          className="form-wrapper"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "0 5px 5px 0",
            marginTop: "40px",
          }}
        >
          <h2>Login</h2>
          <div className="field" style={{ marginBottom: "15px" }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <div className="field" style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password</label>
            <input
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  checkLogin();
                }
              }}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <button
            onClick={() => checkLogin()}
            style={{
              backgroundColor: "#007bff",
              padding: "10px",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Login
          </button>
          <p style={{ color: "#828282" }}>
            Don't have an account? <Link to="/user/register">Create One</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
