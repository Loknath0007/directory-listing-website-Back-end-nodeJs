const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
  getPostsByUser,
} = require('../controllers/postController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { upload } = require('../middlewares/products/fileUplaod');

router
  .route('/')
  .get(getPosts)
  .post(isAuthenticatedUser, upload.array('images', 5), createPost)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAllPosts);

router
  .route('/:id')
  .get(getPost)
  .put(isAuthenticatedUser, updatePost)
  .delete(isAuthenticatedUser, deletePost);

router.route('/user/:id').get(getPostsByUser);

module.exports = router;
