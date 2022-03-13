const mongoose =require('mongoose')
const {Schema}=mongoose

const postSchema = new Schema({
    title:{
        type: String,
        
    },
    category:{
        type: String,
        
        
    },
    subCategory:[{
        title: String,
        
    }],
    description:String
})


module.exports =mongoose.model('Post',postSchema)