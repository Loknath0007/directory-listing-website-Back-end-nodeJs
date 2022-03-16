const express =require('express');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





const getData= async (req,res)=>{

    
    const cursor = await User.find().populate('posts');
    if(!cursor) return res.status(200).json({'message':'No post yet'})
    res.status(200).json(cursor)
     
}

const create= async (req,res)=>{

        const hashPass= await bcrypt.hash(req.body.password,10)
        const data =req.body
    try {
        const result = await User.create({
            ...data,
            password: hashPass
        })
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


// const userLogin=async(req,res)=>{


//     try {

//         const user = await User.find({username: req.body.username})
//         if(user){
    
//             const isValid = await bcrypt.compare(req.body.password,user[0].password)
//             if(isValid){
//                 //generate token
//                 const token =jwt.sign({
//                     username:user[0].username,
//                     userId:user[0]._id,
//                 },process.env.JWT_SECRET,{
//                     expiresIn: '24h'
//                 })
    
//                 res.status(200).json({
//                     'access_token': token,
//                     'message': 'Login successful'
//                 })
    
//             }
//             else{
//                 res.status(401).json({
//                     'message':'Authentication Failed'
//                 })
//             }
//         }
//         else{
//             res.status(401).json({
//                 'message':'Authentication Failed'
//             })
//         }
        
//     } catch (error) {

//         res.status(401).json({
//             'message':'Authentication Failed'
//         })
        
//     }
 
// }


module.exports={
    getData,
    create,
    getSingleData,
    update,
    deleteData,
    
}