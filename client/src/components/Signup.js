import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [Pass, setPass] = useState('password');
  const [checkDetailFlag, setCheckDetailFlag] = useState(false);
  const [credentials, setCredentials] = useState({
    fname: '', lname: '', email: '', type: 'user', password: '', cpassword: ''
  });

  const passwordVisibility = () => {
    setPass(Pass === 'password' ? 'text' : 'password');
  };

  const checkDetails = () => {
    if (credentials.fname && credentials.email && credentials.password && credentials.cpassword) {
      setCheckDetailFlag(true);
    } else {
      setCheckDetailFlag(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    checkDetails();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      return alert('Password and confirm password should be same');
    }
    if (!checkDetailFlag) {
      return alert('All fields are required');
    }

    const name = credentials.fname + ' ' + credentials.lname;

    try {
      const res = await fetch(`${props.host}/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    name, 
    email: credentials.email, 
    type: credentials.type, 
    password: credentials.password 
  })
});
const response = await res.json();


      // Show backend message
      alert(response.message);

      // Redirect to login if signup successful
      if (response.message === 'Account created successfully!') {
        navigate('/login');
      }

    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: '3rem', maxWidth: '40rem', backgroundColor: '#000', padding: '2rem', borderRadius: '1rem', boxShadow: '1rem 1rem 2.6rem green', border: '2px solid white', color: 'white' }}>
      <form>
        <div className="contain">
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">First Name</label>
            <input type="text" className="form-control" id="fname" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name='fname' onChange={onChange} value={credentials.fname} required />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lname" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name='lname' onChange={onChange} value={credentials.lname} required />
          </div>
        </div>
        <div className="contain">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name='email' onChange={onChange} value={credentials.email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="selection" className="form-label">Type</label>
            <select className="form-select" id="selection" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name="type" onChange={onChange} value={credentials.type} required>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>
        <div className="contain">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={Pass} className="form-control" id="password" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name='password' onChange={onChange} value={credentials.password} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type={Pass} className="form-control" id="cpassword" style={{ backgroundColor: 'black', border: '1px solid white', color: 'white' }} name='cpassword' onChange={onChange} value={credentials.cpassword} required />
            <input type="checkbox" onClick={passwordVisibility} style={{ marginTop: '0.4rem' }} /> <span className='mx-1'>Show Password</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn" style={{ marginTop: '1rem', backgroundColor: '#90B494', boxShadow: '0 0 0.3rem black', color: 'black', borderRadius: '1rem', minWidth: '10rem', maxHeight: '2.5rem' }} onClick={handleSubmit}>Signup</button>
        </div>
        <div className="my-2 form-label" style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;
