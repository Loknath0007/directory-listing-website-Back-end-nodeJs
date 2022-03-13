const express=require('express')
const router =express.Router()

const {getData,create,update,getSingleData,deleteData}= require('../controllers/userController')

router.route('/')
    .get(getData)
    .post(create)

router.route('/:id')
.get(getSingleData)
.put(update)
.delete(deleteData)

   module.exports=router 