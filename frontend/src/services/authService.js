// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Set auth token in axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    
    const { token, user } = response.data;
    
    // Set token in axios headers
    if (token) {
      setAuthToken(token);
    }
    
    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to login. Please check your credentials.'
    );
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    const { token, user } = response.data;
    
    // Set token in axios headers if returned
    if (token) {
      setAuthToken(token);
    }
    
    return { token, user };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to register. Please try again.'
    );
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }
    
    // Set token in axios headers
    setAuthToken(token);
    
    const response = await axios.get(`${API_URL}/auth/me`);
    return { token, user: response.data };
  } catch (error) {
    console.error('Error getting current user:', error);
    // Clear token if it's invalid
    logout();
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  setAuthToken(null);
};
