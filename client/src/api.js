const API_URL = process.env.REACT_APP_API_URL;

// Signup function
export const signup = async (email, password, type) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, type })
  });
  return await res.json();
};

// Login function
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};

// Role check
export const checkRole = async (role) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/${role}`, {
    method: 'GET',
    headers: { 'auth-token': token }
  });
  return await res.json();
};
