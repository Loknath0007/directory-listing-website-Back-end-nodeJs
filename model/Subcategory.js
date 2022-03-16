const mongoose =require('mongoose')
const {Schema}=mongoose

const subCategorySchema = new Schema({
    name:{
        type: String,
        
    },
    // Category:[{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Category'
    // }],
  
},{timestamps:true})



module.exports =mongoose.model('Subcategory',subCategorySchema)
