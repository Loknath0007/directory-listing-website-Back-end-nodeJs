const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checkLogin');
const {
  getPost,
  createPost,
  updatePost,
  getSinglePost,
  deletePost,
  deleteAll,
} = require('../controllers/postController');

router.route('/').get(getPost).post(checkLogin, createPost);

router.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost);

// Delete all Post
router.delete('/', deleteAll);

module.exports = router;
