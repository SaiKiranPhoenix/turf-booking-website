const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { USER_EXISTS, USER_NOT_FOUND } = require('../constants/messages');

/**
 * Register a new user
 */
const registerUser = async ({ name, email, password, role = 'user' }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(USER_EXISTS || 'User already exists');
  }

  // Create the user
  const user = await User.create({ name, email, password, role });

  // Generate JWT token
  const token = generateToken(user);

  return {
    user: user.toJSON(), // Automatically removes password via toJSON method
    token,
  };
};

/**
 * Login an existing user
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.matchPassword(password))) {
    throw new Error(USER_NOT_FOUND || 'Invalid credentials');
  }

  const token = generateToken(user);

  return {
    user: user.toJSON(),
    token,
  };
};

/**
 * Get profile of logged-in user
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error(USER_NOT_FOUND || 'User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
