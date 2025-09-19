import React, { useEffect, useState } from 'react';
import apiService from '../api';

const Home = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = apiService.getToken();
    if (!token) return;

    const fetchRole = async () => {
      try {
        const roles = ['user', 'admin', 'moderator'];
        for (let role of roles) {
          const { success, authorized } = await apiService.checkUserRole(role);
          if (success && authorized) {
            setUserType(role);
            break;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRole();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '220px', backgroundColor: '#1E1E2F', color: 'white', padding: '2rem' }}>
        <h2>Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '1rem 0' }}>Home</li>
          <li style={{ margin: '1rem 0' }}>Profile</li>
          <li style={{ margin: '1rem 0' }}>Settings</li>
        </ul>
      </div>
      <div style={{ flex: 1, backgroundColor: '#F4F4F4', padding: '2rem' }}>
        {userType ? (
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h1>Welcome to your dashboard!</h1>
            <p>You are logged in as: <strong>{userType}</strong></p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem' }}>
            <h2>Please login to access your dashboard</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
