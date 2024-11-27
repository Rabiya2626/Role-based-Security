import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    let navigate=useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();
        navigate('/login');
      }
      const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/');
      }
    return (
        <>
            <nav>
                <div className="logo" style={{ height: '4rem' }}>
                </div>
                <div className="middle">
                    <ul>
                        <li>
                            <Link
                                className={activeLink === "home" ? "active" : ""}
                                onClick={() => setActiveLink("home")} to="/"
                            >HOME</Link>
                        </li>
                        
                        
                    </ul>
                </div>
                <div className="auth">
                    <ul>
                        {localStorage.getItem('token') === null ?<li onClick={handleLogin} style={{ cursor: 'pointer' }}>
                            LOGIN
                        </li> : <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            LOGOUT
                        </li> }  
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar