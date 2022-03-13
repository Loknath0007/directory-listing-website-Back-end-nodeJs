const express=require('express')
const router =express.Router()
const checkLogin = require('../middlewares/checkLogin')
const {getPost,createPost,updatePost,getSinglePost,deletePost}= require('../controllers/postController')

router.route('/')
    .get(checkLogin,getPost)
    .post(checkLogin,createPost)

router.route('/:id')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost)

   module.exports=router 