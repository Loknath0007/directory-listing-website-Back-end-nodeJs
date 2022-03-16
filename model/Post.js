const mongoose =require('mongoose')
const {Schema}=mongoose

const postSchema = new Schema({
    title:{
        type: String,
        
    },
    category:[{
        type: String,
        
        
    }],
    subCategory:[{
        type: String,
        
    }],
    location:String,
    description:String,
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    
}, {timestamps: true})

// timestamps: {
    //     createdAt: {
            
    //         type: Date,
    //         default: Date.now
    //     }, // Use `created_at` to store the created date
    //     updatedAt:  {
            
    //         type: Date,
    //         default: Date.now
    //     }, // and `updated_at` to store the last updated date
    //   }


module.exports =mongoose.model('Post',postSchema)