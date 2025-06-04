import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Welcome to the Coding Bootcamp</h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        Please choose your portal
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <Link to="/register">
          <button style={buttonStyle}>User Register</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>User Login</button>
        </Link>
        <Link to="/admin">
          <button style={buttonStyle}>Admin Login</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#2c3e50',
  color: '#fff'
};

export default App;
