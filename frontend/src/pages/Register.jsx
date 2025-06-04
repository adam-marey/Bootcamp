import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:5500/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      setMessage('✅ Registration successful!');
      setEmail('');
      setPassword('');
    } else {
      const data = await res.json();
      setMessage(data.message || '❌ Email is not approved by Admin');
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
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
      <button onClick={handleRegister}>Register</button>
      {message &&
        <p className="message">
          {message}
        </p>}
    </div>
  );
};

export default Register;
