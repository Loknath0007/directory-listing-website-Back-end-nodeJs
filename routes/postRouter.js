const express=require('express')
const router =express.Router()

const {getPost,createPost,updatePost,getSinglePost,deletePost}= require('../controllers/postController')

router.route('/')
    .get(getPost)
    .post(createPost)

router.route('/:id')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost)

   module.exports=router 