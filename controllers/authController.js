const express =require('express');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userLogin=async(req,res)=>{


    try {

        const user = await User.find({username: req.body.username})
        if(user){
    
            const isValid = await bcrypt.compare(req.body.password,user[0].password)
            if(isValid){
                //generate token
                const token =jwt.sign({
                    username:user[0].username,
                    userId:user[0]._id,
                },process.env.JWT_SECRET,{
                    expiresIn: '24h'
                })

                // localStorage.setItem('username'=req.body.username)
    
                res.status(200).json({
                    'access_token': token,
                    'message': 'Login successful'
                    
                })
    
            }
            else{
                res.status(401).json({
                    'message':'Authentication Failed'
                })
            }
        }
        else{
            res.status(401).json({
                'message':'Authentication Failed'
            })
        }
        
    } catch (error) {

        res.status(401).json({
            'message':'Authentication Failed'
        })
        
    }
 
}

const userRoleChecking = async (req,res)=>{
    try{
        const user = await User.find({username: req.body.username})
        if(user){
            user.filter({
                
            })
        }
    }
    catch{

    }
}


module.exports={
    userLogin
}