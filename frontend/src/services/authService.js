// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Login user
export const login = async (email, password) => {
  try {
    // In a real app, this would be an actual API call
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to login. Please check your credentials.'
    );
  }
};

// Register user
export const register = async (userData) => {
  try {
    // In a real app, this would be an actual API call
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    return response.data;
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
    
    // In a real app, this would be an actual API call
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};
