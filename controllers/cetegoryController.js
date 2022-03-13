const express =require('express');
const Category = require('../model/Category');
const ObjectId = require('mongodb').ObjectId


const getData= async (req,res)=>{

    
    const cursor = await Category.find();
    if(!cursor) return res.status(201).json({'message':'No post yet'})
    res.status(201).json(cursor)
     
}

const create= async (req,res)=>{

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
        const result = await Category.create(req.body)
        res.status(201).json(result)
        
    } catch (error) {
        console.log(error);
    }

}




const getSingleData=async(req,res)=>{

    // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

    const id = req.params.id;
   
    const filter = {_id: ObjectId(id)}
    const result = await Category.findOne(filter).exec()

     res.json(result);
     console.log(result.subCategory._id)

}
const update=async(req,res)=>{

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

     const result = await Category.findByIdAndUpdate(filter, updateDoc,options);
     res.json(result);


  

}

const deleteData=async(req,res)=>{
    const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await Category.deleteOne(query);
        res.json(result);

}




module.exports={
    getData,
    create,
    getSingleData,
    update,
    deleteData,
    
}