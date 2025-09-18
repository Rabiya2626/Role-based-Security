import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [Pass, setPass] = useState('password');

  const passwordVisibility = () => {
    setPass(Pass === 'password' ? 'text' : 'password');
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${props.host}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const response = await res.json();

      if (response.authenticationToken) {
        localStorage.setItem('authToken', response.authenticationToken);
        alert('Login successful!');
        navigate('/'); // Redirect to Home
      } else {
        alert(response.message || 'Login failed. Please create an account.');
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: '3rem', maxWidth: '30rem', backgroundColor: '#000', padding: '2rem', borderRadius: '1rem', boxShadow: '1rem 1rem 2.6rem green', border: '2px solid white', color: 'white' }}>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
            style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={Pass}
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }}
          />
          <input type="checkbox" onClick={passwordVisibility} style={{ marginTop: '0.4rem' }} /> <span className='mx-1'>Show Password</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="btn"
            onClick={handleLogin}
            style={{ marginTop: '1rem', backgroundColor: '#90B494', boxShadow: '0 0 0.3rem black', color: 'black', borderRadius: '1rem', minWidth: '10rem', maxHeight: '2.5rem' }}
          >
            Login
          </button>
        </div>
        <div className="my-2 form-label" style={{ textAlign: 'center' }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
