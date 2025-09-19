// API Base URL - fallback to localhost if env var not set
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API Base URL:', API_URL); // Debug log to verify URL

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data;
};

// Helper function to make requests
const makeRequest = async (url, options = {}) => {
  try {
    console.log('Making request to:', url);
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('API Request failed:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    throw error;
  }
};

// 🔹 Signup
export const signup = async (name, email, password, type) => {
  return await makeRequest(`${API_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password, type }),
  });
};

// 🔹 Login
export const login = async (email, password) => {
  return await makeRequest(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// 🔹 Role check
export const checkRole = async (role) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found. Please login.');

  return await makeRequest(`${API_URL}/${role}`, {
    method: 'GET',
    headers: { 'auth-token': token },
  });
};

// 🔹 Get user profile
export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found. Please login.');

  return await makeRequest(`${API_URL}/profile`, {
    method: 'GET',
    headers: { 'auth-token': token },
  });
};

// 🔹 Auth helpers
export const logout = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!localStorage.getItem('token');
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);

// 🔹 Usage wrappers
export const signupUser = async (name, email, password, type = 'user') => {
  try {
    const response = await signup(name, email, password, type);
    console.log('Signup successful:', response.message);
    return { success: true, data: response };
  } catch (error) {
    console.error('Signup failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await login(email, password);
    if (response.token) {
      setToken(response.token);
      console.log('Login successful:', response.message);
      return { success: true, data: response };
    } else {
      return { success: false, error: 'No token received' };
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const checkUserRole = async (role) => {
  try {
    const response = await checkRole(role);
    return { success: true, authorized: response.success };
  } catch (error) {
    console.error('Role check failed:', error.message);
    return { success: false, error: error.message, authorized: false };
  }
};

const apiService = {
  signup,
  login,
  checkRole,
  getUserProfile,
  logout,
  isAuthenticated,
  getToken,
  setToken,
  loginUser,
  signupUser,
  checkUserRole,
};

export default apiService;
