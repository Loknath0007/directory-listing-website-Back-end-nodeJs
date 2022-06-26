const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require("../controllers/cetegoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/")
  .get(getCategories)
  .post(isAuthenticatedUser, authorizeRoles("user"), createCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAllCategories);
router
  .route("/:id")
  .put(isAuthenticatedUser, updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteCategory);

module.exports = router;
