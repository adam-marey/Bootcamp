import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // ✅ If already logged in, redirect to dashboard
  if (localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5500/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        setError('Login failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error &&
        <p style={{ color: 'red' }}>
          {error}
        </p>}
    </div>
  );
}

export default AdminLogin;
