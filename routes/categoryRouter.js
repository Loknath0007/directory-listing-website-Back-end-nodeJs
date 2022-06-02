const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require('../controllers/cetegoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/')
  .get(getCategories)
  .post(isAuthenticatedUser, authorizeRoles('admin'), createCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAllCategories);
router
  .route('/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
