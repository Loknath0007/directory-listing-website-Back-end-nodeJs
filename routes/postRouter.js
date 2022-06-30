const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
  getPostsByUser,
} = require("../controllers/postController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const uploadFile = require("../middlewares/uploadFile");

router
  .route("/")
  .get(getPosts)
  .post(isAuthenticatedUser, uploadFile.array("images", 5), createPost)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin" || "user"),
    deleteAllPosts
  );

router
  .route("/:id")
  .get(getPost)
  .put(isAuthenticatedUser, updatePost)
  .delete(isAuthenticatedUser, deletePost);

router.route("/user/:id").get(getPostsByUser);

module.exports = router;
