import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(
    () => {
      if (token) {
        fetchApprovedEmails();
        fetchRegisteredUsers();
      }
    },
    [token]
  );

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
      toast.error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setLoggedIn(false);
    setLoginEmail('admin');
    setLoginPassword('1234');
    navigate('/admin');
  };

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
    toast.success(data.message);
    setEmailToApprove('');
    fetchApprovedEmails();
  };

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
    toast.success(data.message);
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

  const filteredApproved = approvedEmails.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistered = registeredUsers.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <input
        type="text"
        placeholder="Search emails..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <h2>Approved Emails</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApproved.map((user, index) => {
            const isRegistered = registeredUsers.some(
              reg => reg.email === user.email
            );
            return (
              <tr key={user.email}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {user.email}
                </td>
                <td style={{ color: isRegistered ? 'green' : 'orange' }}>
                  {isRegistered ? 'Registered' : 'Not Registered'}
                </td>
                <td>
                  <button onClick={() => handleDelete(user.email)}>🗑️</button>
                </td>
              </tr>
            );
          })}
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
          {filteredRegistered.map((user, index) =>
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AdminDashboard;
