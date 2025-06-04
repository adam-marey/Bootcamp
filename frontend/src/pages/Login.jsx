import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5500/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('userToken', data.token);
      setMessage('Login successful!');
    } else {
      const data = await res.json();
      setMessage(
        data.message ||
          'Login failed. Please check your credentials or approval status.'
      );
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message &&
        <p>
          {message}
        </p>}
    </div>
  );
};

export default Login;
