const mongoose =require('mongoose')
const {Schema}=mongoose

const categorySchema = new Schema({
    name:{
        type: String,
        
    },
    subCategory:[{
        title: String,
        
    }],
    description:String
})


module.exports =mongoose.model('Category',categorySchema)