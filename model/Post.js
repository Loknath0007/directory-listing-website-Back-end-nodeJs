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
    description:String,
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
})


module.exports =mongoose.model('Post',postSchema)