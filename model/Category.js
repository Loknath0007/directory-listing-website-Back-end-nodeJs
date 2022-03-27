const mongoose =require('mongoose')
const {Schema}=mongoose

const subCategorySchema = new Schema({
    name:{
        type: String,
        // unique: true
        
    }
  
})
// const subCategorySchema = require('./Subcategory')


const categorySchema = new Schema({
    name:{
        type: String,
        // unique: true
        
    },
    subCategory:[subCategorySchema],
    // subCategory:[{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Subcategory'
    // }],
    description:String
}, {timestamps: true})


// module.exports =mongoose.model('SubCategory',subCategorySchema)
module.exports =mongoose.model('Category',categorySchema)