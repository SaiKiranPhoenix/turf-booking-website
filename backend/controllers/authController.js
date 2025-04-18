const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');

// Register User
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const name = `${firstName} ${lastName}`.trim();

  const { user, token } = await authService.registerUser({ name, email, password, role });
  res.status(201).json({ user, token });
});


// Login User
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  res.json({ user, token });
});

// Get Logged-in User
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  res.json(user);
});
