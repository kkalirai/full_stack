import React from "react";

const SurveyCommunity = () => {
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
        <form action="/user/register" method="post">
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
            Join Now
          </button>
          <p style={{ color: "#828282" }}>
            Already have an account? <a href="/user/login">Log in here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SurveyCommunity;
