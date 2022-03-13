const express =require('express');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectId


const getData= async (req,res)=>{

    
    const cursor = await User.find();
    if(!cursor) return res.status(200).json({'message':'No post yet'})
    res.status(200).json(cursor)
     
}

const create= async (req,res)=>{


    try {
        const result = await User.create(req.body)
        res.status(201).json(result)
        
    } catch (error) {
        console.log(error);
    }

}




const getSingleData=async(req,res)=>{

    // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

    const id = req.params.id;
   
    const filter = {_id: ObjectId(id)}
    const result = await User.findOne(filter).exec()
     res.json(result);

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

     const result = await User.findByIdAndUpdate(filter, updateDoc,options);
     res.json(result);


  

}

const deleteData=async(req,res)=>{
    const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await User.deleteOne(query);
        res.json(result);

}


module.exports={
    getData,
    create,
    getSingleData,
    update,
    deleteData
}