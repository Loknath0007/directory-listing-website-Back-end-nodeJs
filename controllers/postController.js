const express = require("express");
const asyncHandler = require("../middlewares/async");
const Post = require("../model/Post");
const User = require("../model/User");

// @Get all posts   GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("contactDetails.user", "name email");

  res.status(200).json({
    success: true,
    count: posts.length,
    posts,
  });
});

// @Get single post   GET /api/posts/:id
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "contactDetails.user",
    "name email"
  );

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// @Create post   POST /api/posts
const createPost = asyncHandler(async (req, res) => {
  console.log("Create post", req.body, req.files);

  const post = await Post.create({
    ...req.body,
    images: req.files.map((file) => file.path),
    category: JSON.parse(req.body.category),
    locations: JSON.parse(req.body.locations),

    contactDetails: {
      user: req.user.id,
      phone: JSON.parse(req.body.contactDetails).phone,
    },
  });

  res.status(201).json({
    success: true,
    post,
  });
});

// @Update post   PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new ErrorResponse(`Post not found`, 404));
  }

  res.status(200).json({
    success: true,
    isUpdated: true,
    data: post,
  });
});

// @Delete post   DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Post not found`, 404));
  }

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

// @Delete all posts   DELETE /api/posts
const deleteAllPosts = asyncHandler(async (req, res, next) => {
  await Post.deleteMany();

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

// @Get all posts by user   GET /api/posts/user/:id
const getPostsByUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    success: true,
    count: posts.length,
    posts,
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
  getPostsByUser,
};
