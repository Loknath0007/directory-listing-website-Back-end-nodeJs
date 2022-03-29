
const {upload } = require('../middlewares/products/fileUplaod')
const path = require('path');
const fs = require('fs')
const imageModal = require('../model/Images')


function fileUpload(req,res){
    upload.single('productImages')
    // const img = fs.readFileSync(req.file.path);
    // var encodeImage = img.toString('base64');
    // var finalImage = {
    //     contentType:req.file.mimetype,
    //     image:new Buffer(encodeImage,'base64')
    // };

    // const newImage = new imageModal.create({
    //     file: req.file.filename
    // })
    

    imageModal.create({
        file: 'avater'
    },function(err,result){
        if(err){
            console.log(err);
        }else{
            // console.log(result.img.Buffer);
            console.log("Saved To database");
            // res.contentType(finalImage.contentType);
            // res.send(finalImage.image);
            res.send(result)
        }
    })
}

// function fileUplaod(req,res){
//     res.send('image upload')
// }

module.exports = fileUpload