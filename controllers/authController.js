const express = require("express");
const User = require("../model/User");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/async");

// user registration
const userRegister = asyncHandler(async (req, res) => {
  const newUser = await User.create(req.body);

  const authToken = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
  res.status(200).json({
    success: true,
    authToken,
    user: newUser,
  });
});

// user login
const userLogin = asyncHandler(async (req, res, next) => {
  const user = await User.find({ email: req.body.email });
  console.log(user);
  if (!user) {
    return next(new ErrorResponse(`Invalid Email or Password`, 404));
  }

  const isValid = await bcrypt.compare(req.body.password, user[0].password);

  if (!isValid) {
    return next(new ErrorResponse(`Invalid Email or Password`, 404));
  }

  //generate token
  const authToken = jwt.sign(
    {
      id: user[0]._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  // localStorage.setItem('name'=req.body.username)

  res.status(200).json({
    access_token: authToken,
    message: "Login successful",
  });
});

const userRoleChecking = async (req, res) => {
  try {
    const user = await User.find({ name: req.body.name });
    if (user) {
      user.filter({});
    }
  } catch {}
};

module.exports = {
  userLogin,
  userRegister,
};
