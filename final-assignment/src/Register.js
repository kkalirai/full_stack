import React from 'react';

const Register = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1>Take your voice further. Join the Survey Community.</h1>
        <p>Connect with others, share your opinions, and make a difference.</p>
      </div>
      <div className="form-wrapper">
        <h2>Create your account</h2>
        <form action="/user/register" method="post">
          <div className="field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit">Join Now</button>
          <p style={{ color: '#828282' }}>
            Already have an account? <a href="/user/login">Log in here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
