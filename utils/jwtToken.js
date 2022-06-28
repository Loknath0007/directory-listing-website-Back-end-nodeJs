// Create and send JWT token and save in the cookie
const sendToken = (user, statusCode, res) => {
  // Create token
  const token = user.getJwtToken();
  console.log("user: on token " + user, token);

  // Set cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
