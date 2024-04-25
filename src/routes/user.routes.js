const express = require('express');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

// Update profile details
router.put('/profile', authenticateUser, updateProfile);

module.exports = router;
