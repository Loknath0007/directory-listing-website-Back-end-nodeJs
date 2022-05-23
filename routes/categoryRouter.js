const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require('../controllers/cetegoryController');

router
  .route('/')
  .get(getCategories)
  .post(createCategory)
  .delete(deleteAllCategories);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;
