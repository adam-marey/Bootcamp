import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
const AdminDashboard = () => {
  const [loginEmail, setLoginEmail] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('1234');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('adminToken')
  );

  const [emailToApprove, setEmailToApprove] = useState('');
  const [approvedEmails, setApprovedEmails] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Fetch data once logged in
  useEffect(
    () => {
      if (token) {
        fetchApprovedEmails();
        fetchRegisteredUsers();
      }
    },
    [token]
  );

  // Admin login
  const login = async () => {
    const res = await fetch('http://localhost:5500/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginEmail, password: loginPassword })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setLoggedIn(true);
    } else {
      alert('Login failed');
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setLoggedIn(false);
    setLoginEmail('admin');
    setLoginPassword('1234');
  };

  // Approve email
  const approveEmail = async () => {
    const res = await fetch('http://localhost:5500/api/admin/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email: emailToApprove })
    });

    const data = await res.json();
    alert(data.message);
    setEmailToApprove('');
    fetchApprovedEmails();
  };

  // Delete approved email
  const handleDelete = async email => {
    if (!window.confirm(`Remove ${email} from approved list?`)) return;

    const res = await fetch(
      `http://localhost:5500/api/admin/approved/${email}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();
    alert(data.message);
    fetchApprovedEmails();
    fetchRegisteredUsers();
  };

  const fetchApprovedEmails = async () => {
    const res = await fetch('http://localhost:5500/api/admin/approved', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setApprovedEmails(data);
  };

  const fetchRegisteredUsers = async () => {
    const res = await fetch('http://localhost:5500/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRegisteredUsers(data);
  };

  // Show login form if not logged in
  if (!loggedIn || !token) {
    return (
      <div className="admin-container">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginEmail}
          onChange={e => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={e => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <button onClick={logout} style={{ float: 'right' }}>
        Sign Out
      </button>

      <div className="form-section">
        <input
          type="email"
          placeholder="Enter user email to approve"
          value={emailToApprove}
          onChange={e => setEmailToApprove(e.target.value)}
        />
        <button onClick={approveEmail}>Approve Email</button>
      </div>

      <h2>Approved Emails</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedEmails.map((user, index) =>
            <tr key={user.email}>
              <td>
                {index + 1}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                <button onClick={() => handleDelete(user.email)}>🗑️</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Registered Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((user, index) =>
            <tr key={user.id}>
              <td>
                {index + 1}
              </td>
              <td>
                {user.email}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
