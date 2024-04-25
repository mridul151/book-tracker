const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const validateUser = require('../utils/validators/user.validator');
const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('../utils/handlers/asyncHandler');
const ApiResponse = require('../utils/handlers/ApiResponse');
const ApiError = require('../utils/handlers/ApiError');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  const error = validateUser({ username, password, email, firstName, lastName });
  if (error) {
    throw new ApiError(400, error);
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email, firstName, lastName });
  await newUser.save();

  return res.status(201).json(new ApiResponse(201, { message: 'User registered successfully' }));
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.json(new ApiResponse(200, { token }));
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Generate a reset token and save it to the user document
  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.resetPasswordToken = resetToken;
  await user.save();

  // Send password reset email with the reset token
  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password?token=${resetToken}`;
  const subject = 'Password Reset';
  const body = `
    <p>Dear User,</p>
    <p>You recently requested to reset your password. Click the button below to reset your password:</p>
    <p><a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you,<br>The BookManagement Team</p>
  `;
  await sendEmail(user.email, subject, body);

  return res.json(new ApiResponse(200, { message: 'Password reset email sent' }));
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId);
  if (!user || user.resetPasswordToken !== token) {
    throw new ApiError(400, 'Invalid reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  await user.save();

  return res.json(new ApiResponse(200, { message: 'Password reset successful' }));
});

// Update profile details
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true }
  );
  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }

  return res.json(new ApiResponse(200, updatedUser));
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } }, // this removes the field from the document
    { new: true }
  );
  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out'));
});

// Get user profile details
const getUserProfileDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return res.json(new ApiResponse(200, user));
});

// Change user password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid old password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return res.json(new ApiResponse(200, { message: 'Password changed successfully' }));
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  logoutUser,
  getUserProfileDetails,
  changeUserPassword
};
