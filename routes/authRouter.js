const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/authController");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
// router.route('/forgot-password').post(forgotPassword);
// router.route('/reset-password/:token').put(resetPassword);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
// router.route('/me/update-password').put(isAuthenticatedUser, updatePassword);
// router.route('/me/update-profile').put(isAuthenticatedUser, updateUserProfile);

// router
//   .route('/admin/users')
//   .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
// router
//   .route('/admin/user/:id')
//   .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
//   .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
//   .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
