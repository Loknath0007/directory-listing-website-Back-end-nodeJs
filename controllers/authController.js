const asyncHandler = require("../middlewares/async");
const sendToken = require("../utils/jwtToken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/User");

// Register user   =>   POST /api/v1/register
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorResponse("User already exists", 400));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  sendToken(newUser, 200, res);
});

// Login user   =>   POST /api/auth/login
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new ErrorResponse("Incorrect email or password", 401));
  }

  sendToken(user, 200, res);
});

// Get current user details   =>   GET /api/auth/me
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user   =>   GET /api/v1/logout
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});
