const jwt = require("jsonwebtoken");
const User = require("../model/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  req.cookies.title = "Authentication";
  console.log(token, req.cookies);

  if (!token) return next(new ErrorResponse("Please login first.", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse("You are not authorized to perform this action.", 403)
      );
    }
    next();
  };
};
