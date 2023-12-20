import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ responses }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <h1 style={{ fontSize: "24px", margin: 0 }}>Survey Site</h1>
          <nav>
            <Link
              to="/user/create-survey"
              style={{
                color: "#007bff",
                textDecoration: "none",
                padding: "5px 10px",
              }}
            >
              Create Survey
            </Link>
            <Link
              to="/"
              style={{
                color: "#007bff",
                textDecoration: "none",
                padding: "5px 10px",
              }}
            >
              Explore Surveys
            </Link>
            <form
              action="/user/logout"
              method="post"
              style={{ display: "inline-block" }}
            >
              <button
                style={{
                  display: "block",
                  border: "none",
                  fontSize: "15px",
                  color: "rgb(109, 109, 255)",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                Logout
              </button>
            </form>
          </nav>
        </header>

        <section
          style={{
            marginBottom: "20px",
            borderRadius: "5px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
          className="survey-list"
        >
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Your Surveys
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {responses?.map(([survey, count]) => (
              <li
                key={survey}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  padding: "5px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  {survey}
                </p>
                <span
                  style={{
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    color: "#333",
                    fontSize: "14px",
                    marginLeft: "20px",
                    padding: "5px 10px",
                    marginRight: "10px",
                  }}
                >
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
