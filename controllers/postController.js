const express = require('express');
const Post = require('../model/Post');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectId;

const getPost = async (req, res) => {
  const posts = await Post.find().populate('user', 'username');
  if (!posts) return res.status(201).json({ message: 'No post yet' });
  res.status(201).json({ count: posts.length, posts });
};

const createPost = async (req, res) => {
  // if(!req?.body) return res.status(400).json({'message':'Noting to save '})

  // const newPost=new Post(req.body)
  // await newPost.save((err)=>{
  //     if(!err) {
  //      res.status(201).json(newPost)
  //     }
  //     else{
  //         res.status(400).json({
  //             'message':"error"
  //         })
  //     }
  // })
  try {
    const result = await Post.create({
      ...req.body,
      user: req.userId,
    });
    // console.log(result.timestamps.createdAt)
    const updateUser = await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          posts: result._id,
        },
      }
    );
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.send({
      message: 'There is an error',
    });
  }
};

const getSinglePost = async (req, res) => {
  // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

  const id = req.params.id;

  const filter = { _id: ObjectId(id) };
  const result = await Post.findOne(filter).exec();
  res.json(result);
};
const updatePost = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'ID is required ' });

  const posts = req.body;
  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: posts,
  };
  const options = {
    new: true,
  };

  const result = await Post.findByIdAndUpdate(filter, updateDoc, options);
  res.json(result);
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await Post.deleteOne(query);
  res.json(result);
};

const deleteAll = async (req, res) => {
  const result = await Post.deleteMany();
  res.status(200).json(result);
};

module.exports = {
  getPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  deleteAll,
};
