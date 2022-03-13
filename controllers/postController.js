const express =require('express')
const Post = require('../model/Post')
const ObjectId = require('mongodb').ObjectId


const getPost= async (req,res)=>{

    
    const cursor = await Post.find();
    if(!cursor) return res.status(201).json({'message':'No post yet'})
    res.status(201).json(cursor)
     
}

const createPost= async (req,res)=>{

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
        const result = await Post.create(req.body)
        res.status(201).json(result)
        
    } catch (error) {
        console.log(error);
    }

}




const getSinglePost=async(req,res)=>{

    // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

    const id = req.params.id;
   
    const filter = {_id: ObjectId(id)}
    const result = await Post.findOne(filter).exec()
     res.json(result);

}
const updatePost=async(req,res)=>{

    const id = req.params.id;
    if(!id) return res.status(400).json({'message':'ID is required '})

    const posts = req.body;
    const filter = {_id: ObjectId(id)}
  
    const updateDoc = {
        $set: posts
         
     };
     const options={
         new: true
     }

     const result = await Post.findByIdAndUpdate(filter, updateDoc,options);
     res.json(result);


  

}

const deletePost=async(req,res)=>{
    const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await Post.deleteOne(query);
        res.json(result);

}


module.exports={
    getPost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost
}