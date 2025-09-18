import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const type = localStorage.getItem('type');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#222', color: 'white' }}>
      <h2>Role-Based App</h2>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
        {!type && <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>}
        {!type && <Link to="/signup" style={{ color: 'white', marginRight: '1rem' }}>Signup</Link>}
        {type && <span style={{ marginRight: '1rem' }}>Role: {type}</span>}
        {type && <button onClick={handleLogout} style={{ padding: '0.3rem 0.7rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
