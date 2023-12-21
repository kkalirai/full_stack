import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SurveyCommunity = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authentication token if required by your API
          // Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("user created");
        Cookies.set("auth_token", response.auth_token, {
          expires: 7,
          path: "/",
        });
        navigate("/user/dashboard");
      } else {
        // Handle error scenarios, e.g., display an error message
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      // Handle exceptions, e.g., network errors
      console.error("Error submitting data:", error);
    }
  };
  return (
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
        <h1>Take your voice further. Join the Survey Community.</h1>
        <p>Connect with others, share your opinions, and make a difference.</p>
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
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="field" style={{ marginBottom: "15px" }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
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
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
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
              type="password"
              id="password"
              name="password"
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
            type="submit"
            style={{
              backgroundColor: "#007bff",
              padding: "10px",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Register
          </button>
          <p style={{ color: "#828282" }}>
            Already have an account? <Link to="/user/login">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SurveyCommunity;
