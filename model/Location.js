const mongoose =require('mongoose')
const {Schema}=mongoose

const citySchema = new Schema({
    name:{
        type: String,
        unique: true
        
    }
  
})
const stateSchema = new Schema({
    name:{
        type: String,
        unique: true
        
    },
    city:[citySchema]
  
})



const locationSchema = new Schema({
    name:{
        type: String,
        unique: true
        
    },
    state:[stateSchema],
 
}, {timestamps: true})


module.exports =mongoose.model('Location',locationSchema)